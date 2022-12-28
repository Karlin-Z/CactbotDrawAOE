
// Due to changes introduced in patch 5.2, overhead markers now have a random offset
// added to their ID. This offset currently appears to be set per instance, so
// we can determine what it is from the first overhead marker we see.
// The first 1B marker in the encounter is an Unholy Darkness stack marker (013E).
const firstHeadmarker = parseInt('013E', 16);
const getHeadmarkerId = (data, matches) => {
  // If we naively just check !data.decOffset and leave it, it breaks if the first marker is 013E.
  // (This makes the offset 0, and !0 is true.)
  if (typeof data.decOffset === 'undefined')
    data.decOffset = parseInt(matches.id, 16) - firstHeadmarker;
  // The leading zeroes are stripped when converting back to string, so we re-add them here.
  // Fortunately, we don't have to worry about whether or not this is robust,
  // since we know all the IDs that will be present in the encounter.
  return (parseInt(matches.id, 16) - data.decOffset).toString(16).toUpperCase().padStart(4, '0');
};


const cPosX=100;
const cPosY=0;
const cPosZ=100;

// const cPosX = -704;
// const cPosY = -40;
// const cPosZ = -507;
const crossTileFlags = '00020001'; // mapEffect flags for '+' tile effect
const diagonalTileFlags = '00400020'; // mapEffect flags for 'x' tile effect
const pos2mCode = { 0: '01', 1: '02', 2: '03', 3: '04', 10: '0F', 11: '05', 12: '06', 13: '10', 20: '0D', 21: '07', 22: '08', 23: '0E', 30: '09', 31: '0A', 32: '0B', 33: '0C' };
const mCode2pos = { "01": 0, "02": 1, "03": 2, "04": 3, "0F": 10, "05": 11, "06": 12, "10": 13, "0D": 20, "07": 21, "08": 22, "0E": 23, "09": 30, "0A": 31, "0B": 32, "0C": 33 };
const aoeport = 9588;  //aoe监听的端口
function postAoe(data) {
  fetch(`http://127.0.0.1:${aoeport}/DrawAoe`, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: data
  });
}
Options.Triggers.push({
  zoneId: ZoneId.AbyssosTheSixthCircleSavage,
  // zoneId: 979,
  initData: () => {
    return {
      以太阶段:0,
      地板形状: {},
      连线pos: [],
      不安全地板: {},
      麻将dellay:0,
    };
  },
  triggers: [
    {
      id: 'P6S Headmarker Own Tracker',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data) => data.decOffset === undefined,
      // Unconditionally set the first headmarker here so that future triggers are conditional.
      run: (data, matches) => {
        getHeadmarkerId(data, matches);
      },
    },
    {
      id: '以太计数器',
      type: 'StartsUsing',
      netRegex: { id: '786[68]', capture: false },
      preRun:(data)=>
      {
        data.以太阶段++;
      },
    },
    {
      id: 'P6S 多元以太 地板形状收集器',
      type: 'MapEffect',
      netRegex: { flags: [crossTileFlags, diagonalTileFlags] },
      run: (data, matches) => {
        // location '00' won't be used for determining mechanic resolution
        if (matches.location !== '00') {
          if (matches.flags == crossTileFlags) {
            data.地板形状[mCode2pos[matches.location]] = 1;
          }
          if (matches.flags == diagonalTileFlags) {
            data.地板形状[mCode2pos[matches.location]] = -1;
          }
        }
      },
    },
    {
      id: 'P6S 多元以太 连线收集器',
      type: 'Tether',
      netRegex: { id: '00CF' },
      run: async (data, matches) => {
        const ids = [];
        ids.push(parseInt(matches.sourceId, 16), parseInt(matches.targetId, 16));
        const combatantData = (await callOverlayHandler({
          call: 'getCombatants',
          ids: ids,
        })).combatants;
        for (const tile of combatantData) {
          // x, y = 85, 95, 105, 115 (with a little variance)
          // map to ([0, 1, 2, 3] and [0, 10, 20, 30]
          const x = Math.floor((tile.PosX - 83) / 10); // add in a -2/+8 buffer in case of goofy pos data
          const y = Math.floor((tile.PosY - 83) / 10) * 10; // add in a -2/+8 buffer in case of goofy pos data
          const idx = x + y;
          if (pos2mCode[idx] === undefined)
            return;
          data.连线pos.push(idx);
        }
      },
    },

    {
      id: 'P6S 多元以太 危险区计算作图',
      type: 'Ability',
      netRegex: { id: '786[68]', capture: false },
      delaySeconds: 2,
      run: (data) => {

        //连线反转
        for (const tpos of data.连线pos) {
          if (data.地板形状[tpos] !== undefined) {
            data.地板形状[tpos] = -data.地板形状[tpos];
          }
        }
        const relCrossTiles = new Array(-30, -20, -10, -3, -2, -1, 0, 1, 2, 3, 10, 20, 30);
        const relDiagonalTiles = new Array(-33, -27, -22, -18, -11, -9, 0, 9, 11, 18, 22, 27, 33, 0);
        for (var key in data.地板形状) {
          if (data.地板形状[key] === 1) {
            for (var addV of relCrossTiles) {
              let r = parseInt(key) + parseInt(addV);
              data.不安全地板[r] ??= 1;
            }
          }
          if (data.地板形状[key] === -1) {
            for (var addV of relDiagonalTiles) {
              let r = parseInt(key) + parseInt(addV);
              data.不安全地板[r] ??= 1;
            }
          }
        }
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            let p = i * 10 + j;
            if (data.不安全地板[p] !== undefined) {
              postAoe(`{"AoeType":3,"PostionType":3,"Postion":{"X":${cPosX - 15 + j * 10},"Y":${cPosY},"Z":${cPosZ - 20 + i * 10}},"TrackMode":1,"Rotation":0.0,"Length":10,"Width":10,"Color":838926335,"Delay":0.0,"During":10.0}`);
            }
          }
        }
        data.地板形状 = {};
        data.连线pos = [];
        data.不安全地板 = {};
      },
    },
    {
      id: '致病孢流 麻将范围',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data, matches) => {
        return ((/00(?:4F|5[0-6])/).test(getHeadmarkerId(data, matches)) && data.me === matches.target);
      },
      run: (data, matches) => {
        let col = data.me === matches.target ? 1291845887 : 1291911167;
        let delay = (parseInt(getHeadmarkerId(data, matches),16)-parseInt('004F',16))*2+4.6;
        postAoe(`{"AoeType":4,"PostionType":3,"Postion":{"X":100,"Y":0.0,"Z":100},"TrackMode":2,"TrackId":0x${matches.targetId},"OuterRadius":30,"SectorAngle":90,"Color":${col},"Delay":${delay},"During":4}`);
      },
    },
    {
      id: '致病孢流 麻将引导提示',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data, matches) => {
        return ((/00(?:4F|5[0-6])/).test(getHeadmarkerId(data, matches)) && data.me === matches.target);
      },
      preRun:(data, matches) => {data.麻将dellay = (parseInt(getHeadmarkerId(data, matches),16)-parseInt('004F',16))*2+4.6;},
      delaySeconds: (data, matches)=> data.麻将dellay,
      alertText: (data, matches) => {
        let point = (parseInt(getHeadmarkerId(data, matches),16)-parseInt('004F',16));
        if (point===1||point===3||point===5||point===7) {
          return "2号点引导";
        }
        else
        {
          return "1号点引导";
        }
      },
    },
    {
      id: '分散死刑范围',
      type: 'StartsUsing',
      netRegex: { id: '788[89]' },
      run: async (data, matches) => {
        postAoe(`{"AoeType":1,"PostionType":1,"ActorId":0x${matches.targetId},"OuterRadius":5,"Color":1291911167,"Delay":0.0,"During":7}`);
      },
    },
    {
      id: '分摊死刑范围',
      type: 'StartsUsing',
      netRegex: { id: '788A' },
      run: async (data, matches) => {
        postAoe(`{"AoeType":4,"PostionType":1,"ActorId":0x${matches.sourceId},"TrackMode":2,"TrackId":0x${matches.targetId},"OuterRadius":30,"SectorAngle":60.0,"Color":1291911167,"Delay":0.0,"During":7}`);
      },
    },
    {
      id: '界外劈砍 万变水波',
      type: 'StartsUsing',
      netRegex: { id: '7869' },
      run: async (data, matches) => {
        postAoe(`{"AoeType":4,"PostionType":3,"Postion":{"X":100,"Y":0.0,"Z":100},"TrackMode":1,"Rotation":30.0,"OuterRadius":25,"SectorAngle":30.0,"Color":1291911167,"Delay":3.7,"During":2.8}`);
        postAoe(`{"AoeType":4,"PostionType":3,"Postion":{"X":100,"Y":0.0,"Z":100},"TrackMode":1,"Rotation":90.0,"OuterRadius":25,"SectorAngle":30.0,"Color":1291911167,"Delay":3.7,"During":2.8}`);
        postAoe(`{"AoeType":4,"PostionType":3,"Postion":{"X":100,"Y":0.0,"Z":100},"TrackMode":1,"Rotation":150.0,"OuterRadius":25,"SectorAngle":30.0,"Color":1291911167,"Delay":3.7,"During":2.8}`);
        postAoe(`{"AoeType":4,"PostionType":3,"Postion":{"X":100,"Y":0.0,"Z":100},"TrackMode":1,"Rotation":210.0,"OuterRadius":25,"SectorAngle":30.0,"Color":1291911167,"Delay":3.7,"During":2.8}`);
        postAoe(`{"AoeType":4,"PostionType":3,"Postion":{"X":100,"Y":0.0,"Z":100},"TrackMode":1,"Rotation":270.0,"OuterRadius":25,"SectorAngle":30.0,"Color":1291911167,"Delay":3.7,"During":2.8}`);
        postAoe(`{"AoeType":4,"PostionType":3,"Postion":{"X":100,"Y":0.0,"Z":100},"TrackMode":1,"Rotation":330.0,"OuterRadius":25,"SectorAngle":30.0,"Color":1291911167,"Delay":3.7,"During":2.8}`);
      },
    },
    {
      id: '黑暗神圣 奶妈分摊',
      type: 'StartsUsing',
      netRegex: { id: '7892' },
      run: async (data, matches) => {
        postAoe(`{"AoeType":1,"PostionType":1,"ActorId":0x${matches.targetId},"OuterRadius":6,"Color":1291910912,"Delay":0.0,"During":5.7}`);
      },
    },
    {
      id: '寄生之舞 前后刀->左右刀',
      type: 'StartsUsing',
      netRegex: { id: '7881' },
      run: async (data, matches) => {
        postAoe(`{"AoeType":4,"PostionType":3,"Postion":{"X":100,"Y":0.0,"Z":100},"TrackMode":1,"Rotation":0.0,"OuterRadius":30,"SectorAngle":90,"Color":1291911167,"Delay":0.0,"During":4.2}`);
        postAoe(`{"AoeType":4,"PostionType":3,"Postion":{"X":100,"Y":0.0,"Z":100},"TrackMode":1,"Rotation":180.0,"OuterRadius":30,"SectorAngle":90,"Color":1291911167,"Delay":0.0,"During":4.2}`);
        postAoe(`{"AoeType":4,"PostionType":3,"Postion":{"X":100,"Y":0.0,"Z":100},"TrackMode":1,"Rotation":90.0,"OuterRadius":30,"SectorAngle":90,"Color":1291911167,"Delay":4.2,"During":3}`);
        postAoe(`{"AoeType":4,"PostionType":3,"Postion":{"X":100,"Y":0.0,"Z":100},"TrackMode":1,"Rotation":-90.0,"OuterRadius":30,"SectorAngle":90,"Color":1291911167,"Delay":4.2,"During":3}`);
      },
    },
    {
      id: '寄生之舞 左右刀->前后刀',  
      type: 'StartsUsing',
      netRegex: { id: '7883' },
      run: async (data, matches) => {
        postAoe(`{"AoeType":4,"PostionType":3,"Postion":{"X":100,"Y":0.0,"Z":100},"TrackMode":1,"Rotation":90.0,"OuterRadius":30,"SectorAngle":90,"Color":1291911167,"Delay":0.0,"During":4.2}`);
        postAoe(`{"AoeType":4,"PostionType":3,"Postion":{"X":100,"Y":0.0,"Z":100},"TrackMode":1,"Rotation":-80.0,"OuterRadius":30,"SectorAngle":90,"Color":1291911167,"Delay":0.0,"During":4.2}`);
        postAoe(`{"AoeType":4,"PostionType":3,"Postion":{"X":100,"Y":0.0,"Z":100},"TrackMode":1,"Rotation":0.0,"OuterRadius":30,"SectorAngle":90,"Color":1291911167,"Delay":4.2,"During":3}`);
        postAoe(`{"AoeType":4,"PostionType":3,"Postion":{"X":100,"Y":0.0,"Z":100},"TrackMode":1,"Rotation":180.0,"OuterRadius":30,"SectorAngle":90,"Color":1291911167,"Delay":4.2,"During":3}`);
      },
    },
    {
      id: '暗天顶 诱导',
      type: 'Ability',
      netRegex: { id: '788B' , capture: false },
      run: async (data, matches) => {
        let ids=[];
        data.party.partyIds_.forEach( pids => {
          ids.push(parseInt(pids, 16))
        }); 
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: ids,
        });
        result.combatants.forEach(comb => {
          if (comb.CurrentHP>0) {
            postAoe(`{"AoeType":1,"PostionType":3,"Postion":{"X":${comb.PosX},"Y":0,"Z":${comb.PosY}},"OuterRadius":5,"Color":686358272,"Delay":0.0,"During":5}`);
          }
        });
      },
    },
    {
      id: '恶病质1 甲壳软体耐性降低 收集器',
      // CF7 软体耐性降低 (蛇)
      // CF8 甲壳耐性降低 (翅膀)
      type: 'GainsEffect',
      netRegex: { effectId: ['CF7', 'CF8'] },
      condition: Conditions.targetIsYou(),
      run: (data, matches) => data.ownDebuff = matches.effectId,
    },
    {
      id: '恶病质1 魔活细胞 处理器',
      // Using Aetheronecrosis (CF9)
      // These come out as 20s, 16s, 12s, or 8s
      type: 'GainsEffect',
      netRegex: { effectId: 'CF9' },
      run: async (data, matches) => {
        const duration = parseFloat(matches.duration)-6;
        postAoe(`{"AoeType":1,"PostionType":1,"ActorId":0x${matches.targetId},"OuterRadius":8,"Color":1291845887,"Delay":${duration},"During":6}`);
      },
    },
    {
      id: '恶病质1 左右半场 处理器',
      // CF7 软体耐性降低 (蛇)
      // CF8 甲壳耐性降低 (翅膀)
      type: 'GainsEffect',
      netRegex: { effectId: 'CF9' },
      condition: Conditions.targetIsYou(),
      delaySeconds: 0.1,
      run: async (data, matches) => {
        const dir = data.ownDebuff === 'CF7' ? 110 : 90;
        postAoe(`{"AoeType":3,"PostionType":3,"Postion":{"X":${dir},"Y":0.0,"Z":80},"TrackMode":1,"Rotation":0.0,"Length":40,"Width":20,"Color":1291911167,"Delay":0.0,"During":30}`);
      },
    },
    {
      id: '寄生翅翼 处理器',  
      type: 'StartsUsing',
      netRegex: { id: '787C' },
      run: async (data, matches) => {
        const rot = data.ownDebuff === 'CF7' ? 90 : -90;
        postAoe(`{"AoeType":3,"PostionType":1,"ActorId":0x${matches.sourceId},"TrackMode":1,"Rotation":${rot},"Length":20,"Width":40,"Color":1291911167,"Delay":0.0,"During":5.7}`);
      },
    },
    {
      id: '多元以太6 左右半场',  
      type: 'Ability',
      netRegex: { id: '786[68]', capture: false },
      condition: (data) => data.以太阶段 === 6,
      run: async (data, matches) => {
        const dir = data.ownDebuff === 'CF7' ? 110 : 90;
        postAoe(`{"AoeType":3,"PostionType":3,"Postion":{"X":${dir},"Y":0.0,"Z":80},"TrackMode":1,"Rotation":0.0,"Length":40,"Width":20,"Color":1291911167,"Delay":0.0,"During":7.6}`);
      },
    },
    {
      id: 'P6S 寄生处理器',
      type: 'GainsEffect',
      // CF3 甲壳寄生 (翅膀 - 身后扇形)
      // D48 软体寄生 (蛇 - 正面扇形)
      netRegex: { effectId: ['CF3', 'D48'] },
      delaySeconds: (_data, matches) => {
        // 1st transmission has 11s duration, 2nd has 25s duration
        // in either case, trigger should fire 3s before debuff expires
        return 
      },
      alertText: (data, matches) =>{
        if (matches.target===data.me) {
          return matches.effectId==='D48' ? '正面扇形' : '身后扇形';
        }
      },
      run: async (data, matches) => {
        const rot = matches.effectId === 'D48' ? 0 : 180;
        const delay=parseFloat(matches.duration) - 4;
        postAoe(`{"AoeType":4,"PostionType":1,"ActorId":0x${matches.targetId},"TrackMode":1,"Rotation":${rot},"OuterRadius":30,"SectorAngle":30,"Color":1291911167,"Delay":${delay},"During":4}`);
      },
    },
  ],

});
