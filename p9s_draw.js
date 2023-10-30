let pipeAoe=false;
let aoeport = 9588; //aoe监听的端口
function postAoe(data) {
  if (pipeAoe) {
    sendExtraLogCommand(`Add`,data);
  }else{
    fetch(`http://127.0.0.1:${aoeport}/Add`, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: data
    });
  }
}
function requestPartyList() {
  if (pipeAoe){
    sendExtraLogCommand(`GetData`,"Team");
  }else{
    fetch(`http://127.0.0.1:${aoeport}/GetData`, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: "Team"
    });
  }
}
const sendExtraLogCommand = (command,info) => {
  callOverlayHandler({ call: 'ExtraLog', c: `${command}`, p: `${info}` });
}
function Move(cmd) {
  if (pipeAoe){
    sendExtraLogCommand(`Move`,`${cmd}`);
  }else{
    fetch(`http://127.0.0.1:${aoeport}/Move`, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: `${cmd}`
    });
  }
 
}

const RotatePointFromCentre = (point, centre, angle) => {
  let rot=(1-(Math.atan2(point.x-centre.x,point.y-centre.y)/Math.PI))%2*180;
  let dis=Math.sqrt(Math.pow(point.x - centre.x, 2) + Math.pow((point.y - centre.y), 2));
  var end=new Object();
  end.x = centre.x+Math.sin((rot + angle) / 180 * Math.PI) * dis;
  end.y = centre.y-Math.cos((rot + angle) / 180 * Math.PI) * dis; 
  return end;
}

const dualspells = {
  fireIce: ['8154', '8184'],
  thunderIce: ['8155', '8185'],
};
const headmarkers = {
  // vfx/lockon/eff/tank_lockonae_0m_5s_01t.avfx
  dualityOfDeath: '01D4',
  // vfx/lockon/eff/m0361trg_a1t.avfx (through m0361trg_a8t)
  limitCut1: '004F',
  limitCut2: '0050',
  limitCut3: '0051',
  limitCut4: '0052',
  limitCut5: '0053',
  limitCut6: '0054',
  limitCut7: '0055',
  limitCut8: '0056',
  // vfx/lockon/eff/r1fz_skywl_s9x.avfx
  defamation: '014A',
  // vfx/lockon/eff/n5r9_lockon_bht_c0g.avfx
  cometMarker: '01B3',
};
const limitCutMarkers = [
  headmarkers.limitCut1,
  headmarkers.limitCut2,
  headmarkers.limitCut3,
  headmarkers.limitCut4,
  headmarkers.limitCut5,
  headmarkers.limitCut6,
  headmarkers.limitCut7,
  headmarkers.limitCut8,
];
const limitCutNumberMap = {
  '004F': 1,
  '0050': 2,
  '0051': 3,
  '0052': 4,
  '0053': 5,
  '0054': 6,
  '0055': 7,
  '0056': 8,
};
const limitCutPlayerActive = [
  // These ordered nested arrays contain the limit cut headmarkers for [ dash order, tower soak order ]
  [2, 6],
  [4, 8],
  [6, 2],
  [8, 4],
];
// Time between headmarker and defamation for Chimeric Succession.
const chimericLimitCutTime = {
  1: 10,
  2: 13,
  3: 16,
  4: 19,
};
const firstHeadmarker = parseInt(headmarkers.dualityOfDeath, 16);
const getHeadmarkerId = (data, matches) => {
  // If we naively just check !data.decOffset and leave it, it breaks if the first marker is 00DA.
  // (This makes the offset 0, and !0 is true.)
  if (data.decOffset === undefined)
    data.decOffset = parseInt(matches.id, 16) - firstHeadmarker;
  // The leading zeroes are stripped when converting back to string, so we re-add them here.
  // Fortunately, we don't have to worry about whether or not this is robust,
  // since we know all the IDs that will be present in the encounter.
  return (parseInt(matches.id, 16) - data.decOffset).toString(16).toUpperCase().padStart(4, '0');
};
const centerX = 100;
const centerY = 100;





Options.Triggers.push({
  id: 'AnabaseiosTheNinthCircleSavage_Draw',
  zoneId: ZoneId.AnabaseiosTheNinthCircleSavage,
  config: [
    {
      id: "AoeSendMode",
      name: { en: "Aoe发送方式" },
      type: "select",
      options: { en: { "网络": "Http", "管道": "Pipe" } },
      default: "Http",
    },
    {
      id: "PPex_P9s_AutoGym",
      name: { en: "自动跑一运" },
      type: "checkbox",
      default: false,
    },
    {
      id: "DebugMode",
      name: { en: "以下列职业角色触发触发器" },
      type: "checkbox",
      default: false,
    },
    {
      id: "TriggerJob",
      name: { en: "触发主视角职业" },
      type: "select",
      options: { en: {
        '骑士':`PLD`,
        '武僧':`MNK`,
        '战士':`WAR`,
        '龙骑':`DRG`,
        '诗人':`BRD`,
        '白魔':`WHM`,
        '黑魔':`BLM`,
        '召唤':`SMN`,
        '学者':`SCH`,
        '忍者':`NIN`,
        '机工':`MCH`,
        '黑骑':`DRK`,
        '占星':`AST`,
        '武士':`SAM`,
        '赤魔':`RDM`,
        '枪刃':`GNB`,
        '舞者':`DNC`,
        '镰刀':`RPR`,
        '贤者':`SGE`,
        '青魔':`BLU`
      } },
      default: "PLD",
    },
  ],
  initData: () => {
    setTimeout(() => {
      Move(`Clear`);
      // sendCommand(`/e Clear`)
    }, 5000);
    return {
      一运球pos: [],
      麻将Id: [],
      一运计数:0,
      dualityBuster: [],
      levinOrbs: {},
      limitCutDash: 0,
      limitCut1Count: 0,
    };
  },
  triggers: [
    {
      id: '设定发送方式',
      type: 'StartsUsing',
      netRegex: { id: '814C', capture: false },
      suppressSeconds: 20,
      run: async (data, matches) => {
        if (data.triggerSetConfig.AoeSendMode === 'Http')
          pipeAoe = false;
        if (data.triggerSetConfig.AoeSendMode === 'Pipe')
          pipeAoe = true;
      },
    },
    // 头顶点名解析
    {
      id: 'P9S 头顶点名解析',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data) => data.decOffset === undefined,
      suppressSeconds: 99999,
      // Unconditionally set the first headmarker here so that future triggers are conditional.
      run: (data, matches) => getHeadmarkerId(data, matches),
    },
    
    
    // // 双T死刑
    {
      id: 'P9S 双T死刑',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data, matches) => getHeadmarkerId(data, matches) === headmarkers.dualityOfDeath,
      run: (data, matches) => {
        postAoe(`{"Name":"双T死刑","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":6,"Color":1073807359,"Delay":0,"During":6}`);
      },
    },
    // P9S 双重咒文收集器
    {
      // 8154 短冰火 4.5s
      // 8184 长冰火 4s
      // 8155 短冰雷 4.5s
      // 8185 长冰雷 4s
      id: 'P9S 双重咒文收集器',
      type: 'StartsUsing',
      netRegex: { id: ['8154', '8184', '8155', '8185'] },
      run: (data, matches) => data.双重咒文 = matches.id,
    },
    // P9S 双重咒文范围
    {
      id: 'P9S 双重咒文范围',
      type: 'Ability',
      netRegex: { id: ['8122','8123','815C'] },
      run: (data, matches) => {

      // 普通火8156 6m
      // 普通冰8157 14m
      // 强化火8158 12m
      // 强化冰8159 8m
      // 普通雷815B 8m
      // 强化雷815A 16m
      // 火强化 8122
      // 冰强化 8123
      // 雷强化 815C

        var Dur=4.5;
        if (data.双重咒文=='8184' || data.双重咒文=='8185') {
          Dur=4;
        }
        if ((data.双重咒文=='8154' || data.双重咒文=='8184') && matches.id=='8122') {
          // 短冰火强化火
          for (let i = 0; i < 4; i++) {
            postAoe(`{"Name":"强化火","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[i]},"Radius":12,"Color":838926206,"Delay":0,"During":${Dur}}`);
          }
          postAoe(`{"Name":"普通冰","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":20,"InnerRadius":14,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":${Dur}}`);
        }
        if ((data.双重咒文=='8154' || data.双重咒文=='8184') && matches.id=='8123') {
          // 短冰火强化冰
          for (let i = 0; i < 4; i++) {
            postAoe(`{"Name":"普通火","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[i]},"Radius":6,"Color":838926206,"Delay":0,"During":${Dur}}`);
          }
          postAoe(`{"Name":"强化冰","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":20,"InnerRadius":8,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":${Dur}}`);
        }
        if ((data.双重咒文=='8155' || data.双重咒文=='8185') && matches.id=='8123') {
          // 短冰雷强化冰
          for (let i = 0; i < 8; i++) {
            postAoe(`{"Name":"普通雷","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":${data.PartyIds[i]},"Length":20,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":2,"During":${Dur-2}}`);
          }
          postAoe(`{"Name":"强化冰","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":20,"InnerRadius":8,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":${Dur}}`);
        }
        if ((data.双重咒文=='8155' || data.双重咒文=='8185') && matches.id=='815C') {
          // 短冰雷强化雷
          for (let i = 0; i < 8; i++) {
            postAoe(`{"Name":"强化雷","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":${data.PartyIds[i]},"Length":20,"Width":16,"Rotation":0.0,"Color":1073807359,"Delay":2,"During":${Dur-2}}`);
          }
          postAoe(`{"Name":"普通冰","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":20,"InnerRadius":14,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":${Dur}}`);
        }
        delete data.双重咒文;
        

      },
      
    },
    // P9S 射线钢铁
    {
      id: 'P9S 射线钢铁',
      type: 'StartsUsing',
      netRegex: { id: ['8161'] },
      run: (data, matches) => {
        postAoe(`{"Name":"射线钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":8,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":2,"During":6}`);
      },
    },
    // P9S 连转脚
    {
      id: 'P9S 连转脚',
      type: 'StartsUsing',
      netRegex: { id: ['8167','8168','8169','816A'] },
      run: (data, matches) => {
        // 钢铁月环7s
        // 正反面10s
        // 反向钢铁月环13s
        if (matches.id=='8167') {
          // 钢铁+正面
          postAoe(`{"Name":"连转脚钢铁+正面 钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":12,"Color":1073807359,"Delay":0,"During":7}`);
          postAoe(`{"Name":"连转脚钢铁+正面 正面","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":20,"Angle":180,"Rotation":0.0,"Color":1073807359,"Delay":6.5,"During":3.5}`);
          postAoe(`{"Name":"连转脚钢铁+正面 后月环","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":20,"InnerRadius":8,"Color":1073807359,"Delay":7,"During":6}`);
        }
        if (matches.id=='8168') {
          // 月环+正面
          postAoe(`{"Name":"连转脚月环+正面 月环","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":20,"InnerRadius":8,"Color":1073807359,"Delay":0,"During":7}`);
          postAoe(`{"Name":"连转脚月环+正面 正面","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":20,"Angle":180,"Rotation":0.0,"Color":1073807359,"Delay":6.5,"During":3.5}`);
          postAoe(`{"Name":"连转脚月环+正面 后钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":12,"Color":1073807359,"Delay":7,"During":6}`);
        }
        if (matches.id=='8169') {
          // 钢铁+背面
          postAoe(`{"Name":"连转脚钢铁+背面 钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":12,"Color":1073807359,"Delay":0,"During":7}`);
          postAoe(`{"Name":"连转脚钢铁+背面 背面","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":20,"Angle":180,"Rotation":180.0,"Color":1073807359,"Delay":6.5,"During":3.5}`);
          postAoe(`{"Name":"连转脚钢铁+背面 后月环","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":20,"InnerRadius":8,"Color":1073807359,"Delay":7,"During":6}`);
        }
        if (matches.id=='816A') {
          // 月环+背面
          postAoe(`{"Name":"连转脚月环+背面 月环","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":20,"InnerRadius":8,"Color":1073807359,"Delay":0,"During":7}`);
          postAoe(`{"Name":"连转脚月环+背面 背面","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":20,"Angle":180,"Rotation":180,"Color":1073807359,"Delay":6.5,"During":3.5}`);
          postAoe(`{"Name":"连转脚月环+背面 后钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":12,"Color":1073807359,"Delay":7,"During":6}`);
        }
      },
    },
    // 击退分摊
    { 
      id: 'P9S 击退分摊',
      type: 'Ability',
      netRegex: { id: '815F', capture: true },
      run: async (data, matches) => {
        for (let i = 0; i < 4; i++) {
          postAoe(`{"Name":"击退分摊","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[i]},"Radius":6,"Color":1073807104,"Delay":0,"During":3}`);
        }
      },
    },
    // P9S 双奶分摊
    {
      id: 'P9S 双奶分摊',
      type: 'StartsUsing',
      netRegex: { id: '816D', capture: false },
      run: async (data, matches) => {
        for (let i = 2; i < 4; i++) {
          postAoe(`{"Name":"双奶分摊","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[i]},"Radius":6,"Color":1073807104,"Delay":0,"During":5}`);
        }
      },
    },
    // P9S 龙卷分摊
    {
      id: 'P9S 龙卷分摊',
      type: 'StartsUsing',
      netRegex: { id: '8177'},
      run: async (data, matches) => {
        postAoe(`{"Name":"龙卷分散 分摊1","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"Farest","TrackValue":1,"Radius":6,"Color":1073807104,"Delay":0,"During":12}`);
        postAoe(`{"Name":"龙卷分散 分摊2","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"Farest","TrackValue":1,"Radius":6,"Color":1073807104,"Delay":14,"During":3.5}`);
        postAoe(`{"Name":"龙卷分散 分散1","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"Nearest","TrackValue":4,"Radius":20,"Angle":45,"Rotation":0.0,"Color":1073807359,"Delay":7,"During":4}`);
        postAoe(`{"Name":"龙卷分散 分散2","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"Nearest","TrackValue":4,"Radius":20,"Angle":45,"Rotation":0.0,"Color":1073807359,"Delay":15.5,"During":2}`);
        
        },
    },
    

    // P9S 二运标记
    {
      id: 'P9S 二运标记',
      type: 'StartsUsing',
      netRegex: { id: '81BB', capture: false },
      run: (data) => data.P9s二运 = true,
    },
    // 前方炎连击
    {
      id: 'P9S 前方炎连击',
      type: 'StartsUsing',
      netRegex: { id: '878E'},
      run: async (data, matches) => {
        postAoe(`{"Name":"前方炎连击","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":40,"Angle":180,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":9,"During":5}`);
      },
    },
    // 后方炎连击
    {
      id: 'P9S 后方炎连击',
      type: 'StartsUsing',
      netRegex: { id: '878F'},
      run: async (data, matches) => {
        postAoe(`{"Name":"后方炎连击","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":40,"Angle":180,"Rotation":180,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":9,"During":5}`);
      },
    },
    
    
    //球收集器
    //球点名出现后 按顺序标记和走位
    {
      // Ball of Levin combatants are added ~0.3 seconds after Kokytos finishes using Levinstrike Summoning
      // and ~1.7 before Kokytos begins using Scrambled Succession (which is when limit cut markers appear)
      // These combatants are added in their actual positions, so no need to check OP for combatant data.
      id: 'P9S 一运 球收集',
      type: 'AddedCombatant',
      // There are multiple invsible combatants that share this name, but the ones that receive HeadMarkers
      // in limit cut (the ones we care about) are distinguishable because their level attribute is set to 90.
      netRegex: {npcBaseId: '16089' },
      run: (data, matches) => {
        // (0 = N, 1 = NE ... 7 = NW)
        data.一运球pos[matches.id]={x:matches.x,y:matches.y};
      },
    },
    {
      id: 'P9S 一运 麻将点名收集',
      type: 'HeadMarker',
      netRegex: {},
      run: (data, matches) => {
        const correctedMatch = getHeadmarkerId(data, matches);
        if(!limitCutMarkers.includes(correctedMatch)) return;
        const orbLimitCutNumber = limitCutNumberMap[correctedMatch];
        // Levin orbs should always receive a odd-numbered limit cut headmarker
        data.麻将Id[orbLimitCutNumber]=matches.targetId;
      },
    },
    // P9S 一运 顺逆解析
    {
      id: 'P9S 一运 顺逆解析',
      type: 'StartsUsing',
      netRegex: { id: '817D'},
      delaySeconds:0.5,
      run: async (data, matches) => {
        let mj1pos= data.一运球pos[data.麻将Id[1]];
        let mj2pos= data.一运球pos[data.麻将Id[3]];
        let mj1pos8dir= Math.round(5 - 4 * Math.atan2(mj1pos.x-100, mj1pos.y-100) / Math.PI) % 8;
        let mj2pos8dir= Math.round(5 - 4 * Math.atan2(mj2pos.x-100, mj2pos.y-100) / Math.PI) % 8;
        data.一运顺时针=(mj2pos8dir - mj1pos8dir + 8) % 8 === 2;
      },
    },
    {
      id: 'P9S 一运 麻将aoe',
      type: 'HeadMarker',
      netRegex: {},
      run: (data, matches) => {
        const correctedMatch = getHeadmarkerId(data, matches);
        if(correctedMatch != headmarkers.defamation) return;

        data.一运计数++;
        let tw=(data.一运计数+2)*2;
        if (tw>8) tw=tw%8;

        let ballPos=data.一运球pos[data.麻将Id[data.一运计数*2-1]];


        postAoe(`{"Name":"一运球${data.一运计数}aoe","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${100-(ballPos.x-100)*1.6},"Y":0,"Z":${100-(ballPos.y-100)*1.6}},"Radius":6,"Color":1073807359,"Delay":4.3,"During":2.2}`);
        postAoe(`{"Name":"一运塔${data.一运计数}踩塔范围","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${100-(ballPos.x-100)*1.6},"Y":0,"Z":${100-(ballPos.y-100)*1.6}},"Radius":3,"Color":1073807104,"Delay":6.5,"During":3.3}`);
        postAoe(`{"Name":"一运冰${data.一运计数}aoe","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":20,"Color":1073807359,"Delay":6,"During":3.1}`);
        postAoe(`{"Name":"一运火${data.一运计数}aoe","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${data.麻将Id[data.一运计数*2]},"Radius":6,"Color":1073807359,"Delay":4.5,"During":4.5}`);


      },
    },
    {
      id: 'P9S 一运 马拉松 麻将处理',
      type: 'HeadMarker',
      netRegex: {},
      delaySeconds:0.1,
      run: (data, matches) => {
        const correctedMatch = getHeadmarkerId(data, matches);
        if(correctedMatch != headmarkers.defamation) return;

        let tw=(data.一运计数+2)*2;
        if (tw>8) tw=tw%8;

        let rot=146.31;
        if (data.一运顺时针) rot=213.69;

        let ballPos=data.一运球pos[data.麻将Id[data.一运计数*2-1]];

        let dur=4.7;
        let delay=4.3;
        if (data.一运计数==1) {
          dur=9;
          delay=0;
        }

        

        if (matches.target==data.me) {
          postAoe(`{"Name":"一运冰${data.一运计数} 位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${(ballPos.x-100)*1.7+100},"Y":0,"Z":${(ballPos.y-100)*1.7+100}},"Radius":0.5,"Color":1073807104,"Delay":${delay},"During":${dur}}`);
          postAoe(`{"Name":"一运冰${data.一运计数} 连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${(ballPos.x-100)*1.7+100},"Y":0,"Z":${(ballPos.y-100)*1.7+100}},"Thikness":5,"Color":4278255360,"Delay":${delay},"During":${dur}}`)
          if (data.triggerSetConfig.PPex_P9s_AutoGym){
            setTimeout(() => {
              Move(`{"X":${(ballPos.x-100)*1.7+100},"Y":0,"Z":${(ballPos.y-100)*1.7+100}}`);
            }, delay*1000);
          }
        }

       
        if (parseInt(data.麻将Id[data.一运计数*2],16)==data.myId) {
          let ePos=RotatePointFromCentre(ballPos,{x:100,y:100},rot);
          postAoe(`{"Name":"一运火${data.一运计数} 位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${(ePos.x-100)*1.9+100},"Y":0,"Z":${(ePos.y-100)*1.9+100}},"Radius":0.5,"Color":1073807104,"Delay":${delay},"During":${dur}}`);
          postAoe(`{"Name":"一运火${data.一运计数} 连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${(ePos.x-100)*1.9+100},"Y":0,"Z":${(ePos.y-100)*1.9+100}},"Thikness":5,"Color":4278255360,"Delay":${delay},"During":${dur}}`)
          if (data.triggerSetConfig.PPex_P9s_AutoGym){
            setTimeout(() => {
              Move(`{"X":${(ePos.x-100)*1.9+100},"Y":0,"Z":${(ePos.y-100)*1.9+100}}`);
            }, delay*1000);
          }
        }

        if (parseInt(data.麻将Id[tw],16)==data.myId) {
          postAoe(`{"Name":"一运塔${data.一运计数} 等待位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${100-(ballPos.x-100)*0.8},"Y":0,"Z":${100-(ballPos.y-100)*0.8}},"Radius":0.5,"Color":1073807104,"Delay":${delay},"During":${7-delay}}`);
          postAoe(`{"Name":"一运塔${data.一运计数} 等待连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${100-(ballPos.x-100)*0.8},"Y":0,"Z":${100-(ballPos.y-100)*0.8}},"Thikness":5,"Color":4278255360,"Delay":${delay},"During":${7-delay}}`)
          postAoe(`{"Name":"一运塔${data.一运计数} 踩塔位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${100-(ballPos.x-100)*1.6},"Y":0,"Z":${100-(ballPos.y-100)*1.6}},"Radius":0.5,"Color":1073807104,"Delay":7,"During":2.5}`);
          postAoe(`{"Name":"一运塔${data.一运计数} 踩塔连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${100-(ballPos.x-100)*1.6},"Y":0,"Z":${100-(ballPos.y-100)*1.6}},"Thikness":5,"Color":4278255360,"Delay":7,"During":2.5}`)
          if (data.triggerSetConfig.PPex_P9s_AutoGym){
            setTimeout(() => {
              Move(`{"X":${100-(ballPos.x-100)*0.8},"Y":0,"Z":${100-(ballPos.y-100)*0.8}}`);
            }, delay*1000);
            setTimeout(() => {
              Move(`{"X":${100-(ballPos.x-100)*1.6},"Y":0,"Z":${100-(ballPos.y-100)*1.6}}`);
            }, 7000);
          }
        }
        if(matches.target!=data.me && parseInt(data.麻将Id[data.一运计数*2],16)!=data.myId && parseInt(data.麻将Id[tw],16)!=data.myId)
        {
          postAoe(`{"Name":"一运闲${data.一运计数} 位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${100-(ballPos.x-100)*0.8},"Y":0,"Z":${100-(ballPos.y-100)*0.8}},"Radius":0.5,"Color":1073807104,"Delay":${delay},"During":${dur}}`);
          postAoe(`{"Name":"一运闲${data.一运计数} 连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${100-(ballPos.x-100)*0.8},"Y":0,"Z":${100-(ballPos.y-100)*0.8}},"Thikness":5,"Color":4278255360,"Delay":${delay},"During":${dur}}`)
          if (data.triggerSetConfig.PPex_P9s_AutoGym){
            setTimeout(() => {
              Move(`{"X":${100-(ballPos.x-100)*0.8},"Y":0,"Z":${100-(ballPos.y-100)*0.8}}`);
            }, delay*1000);
          }
        }

      },
    },
    // 1b:.{8}:.*:.{4}:.{4}:00d[6-D]:|
    // 球aoe 6m 817f
    // 火aoe 6m 8180
    // 冰aoe 20m 8183/8190/8191/8192
    // 塔aoe 3m 8181 中心距离场中16m
 
    // 冰点名-4.3s-塔判定-4.7s-火判定

    // 817d 0s
    // 点名 0s

    // 冰点名1 6s
    // 球aoe1 12.5s
    // 塔aoe1 14s-16s
    // 火aoe1 15s
    // 冰aoe1 15.2s

    // 冰点名2 11.7s
    // 球aoe2 18.2s
    // 塔aoe2 19.7s-21.7s
    // 火aoe2 20.7s
    // 冰aoe2 20.9s

    // 冰点名3 17.4s
    // 球aoe3 23.9s
    // 塔aoe3 25.4s-27.4s
    // 火aoe3 26.4s
    // 冰aoe3 26.6s

    // 冰点名4 23s
    // 球aoe4 29.5s
    // 塔aoe4 31.0s-33.0s
    // 火aoe4 32.0s
    // 冰aoe4 32.2s



    // {
    //   id: 'P9S Limit Cut Levin Orb Start and Rotation',
    //   type: 'StartsUsing',
    //   netRegex: { id: '817D', source: 'Kokytos', capture: false },
    //   delaySeconds: 1.5,
    //   infoText: (data, _matches, output) => {
    //     let firstOrb8Dir;
    //     let secondOrb8Dir;
    //     // Orb order is limit cut headmarkers 1 > 3 > 5 > 7
    //     // 1 is always adjacent to 3, 3 is always adjacent to 5, and so on.
    //     for (const combatant in data.levinOrbs) {
    //       switch (data.levinOrbs[combatant]?.order) {
    //         case 1:
    //           firstOrb8Dir = data.levinOrbs[combatant]?.dir;
    //           break;
    //         case 3:
    //           secondOrb8Dir = data.levinOrbs[combatant]?.dir;
    //           break;
    //       }
    //     }
    //     if (firstOrb8Dir === undefined || secondOrb8Dir === undefined)
    //       return;
    //     const firstOrb8DirStr = Directions.outputFrom8DirNum(firstOrb8Dir);
    //     if (firstOrb8DirStr === undefined)
    //       return;
    //     const firstOrbDir = output[firstOrb8DirStr]();
    //     const rotationDir = (secondOrb8Dir - firstOrb8Dir + 8) % 8 === 2
    //       ? output.clockwise()
    //       : output.counterclock();
    //     if (firstOrbDir !== undefined && rotationDir !== undefined)
    //       return output.text({ dir: firstOrbDir, rotation: rotationDir });
    //     return;
    //   },
    //   outputStrings: {
    //     text: {
    //       en: 'First Orb ${dir} => ${rotation}',
    //       de: 'Erster Orb ${dir} => ${rotation}',
    //       fr: 'Premier orbe ${dir} => ${rotation}',
    //       ja: '1回目の玉 ${dir} => ${rotation}',
    //       cn: '第一个球 ${dir} => ${rotation}',
    //       ko: '첫번째 구슬 ${dir} => ${rotation}',
    //     },
    //     clockwise: Outputs.clockwise,
    //     counterclock: Outputs.counterclockwise,
    //     ...Directions.outputStrings8Dir,
    //   },
    // },
    // {
    //   id: 'P9S Limit Cut 1 Player Number',
    //   type: 'HeadMarker',
    //   netRegex: {},
    //   condition: (data, matches) => {
    //     return !data.seenChimericSuccession &&
    //       limitCutMarkers.includes(getHeadmarkerId(data, matches));
    //   },
    //   preRun: (data, matches) => {
    //     data.limitCut1Count++;
    //     if (data.me === matches.target) {
    //       const correctedMatch = getHeadmarkerId(data, matches);
    //       data.limitCutNumber = limitCutNumberMap[correctedMatch];
    //     }
    //   },
    //   durationSeconds: 30,
    //   infoText: (data, matches, output) => {
    //     if (data.me !== matches.target)
    //       return;
    //     const expectedLimitCutNumbers = [2, 4, 6, 8];
    //     if (
    //       data.limitCutNumber === undefined ||
    //       !expectedLimitCutNumbers.includes(data.limitCutNumber)
    //     )
    //       return;
    //     return output[data.limitCutNumber]();
    //   },
    //   tts: (data, matches, output) => {
    //     if (data.me !== matches.target || data.limitCutNumber === undefined)
    //       return;
    //     return output.tts({ num: data.limitCutNumber });
    //   },
    //   outputStrings: {
    //     2: {
    //       en: '2: First dash, third tower',
    //       de: '2: 1. Raus, 3. Turm',
    //       cn: '2麻 1火3塔',
    //       ko: '2: 1돌진, 3기둥',
    //     },
    //     4: {
    //       en: '4: Second dash, last tower',
    //       de: '4: 2. Raus, 4. Turm',
    //       cn: '4麻 2火4塔',
    //       ko: '4: 2돌진, 4기둥',
    //     },
    //     6: {
    //       en: '6: First tower, third dash',
    //       de: '6: 1. Turm, 3. Raus',
    //       cn: '6麻 1塔3火',
    //       ko: '4: 1기둥, 3돌진',
    //     },
    //     8: {
    //       en: '8: Second tower, last dash',
    //       de: '8: 2. Turm, 4. Raus',
    //       cn: '8麻 2塔4火',
    //       ko: '8: 2기둥, 4돌진',
    //     },
    //     tts: {
    //       en: '${num}',
    //       de: '${num}',
    //       fr: '${num}',
    //       ja: '${num}',
    //       cn: '${num}',
    //       ko: '${num}',
    //     },
    //   },
    // },
    // {
    //   id: 'P9S Limit Cut 1 Early Defamation',
    //   type: 'HeadMarker',
    //   netRegex: {},
    //   condition: (data, matches) => {
    //     return data.limitCut1Count === 4 && !data.seenChimericSuccession &&
    //       limitCutMarkers.includes(getHeadmarkerId(data, matches));
    //   },
    //   infoText: (data, _matches, output) => {
    //     if (data.limitCutNumber !== undefined)
    //       return;
    //     return output.defamationLater();
    //   },
    //   outputStrings: {
    //     defamationLater: {
    //       en: 'Defamation on you (later)',
    //       de: 'Ehrenstrafe auf dir (später)',
    //       cn: '大圈点名 (稍后放置)',
    //       ko: '광역 대상자 (나중에)',
    //     },
    //   },
    // },
    // {
    //   id: 'P9S Chimeric Limit Cut Player Number',
    //   type: 'HeadMarker',
    //   netRegex: {},
    //   condition: (data, matches) => {
    //     return data.seenChimericSuccession && data.me === matches.target &&
    //       limitCutMarkers.includes(getHeadmarkerId(data, matches));
    //   },
    //   preRun: (data, matches) => {
    //     const correctedMatch = getHeadmarkerId(data, matches);
    //     data.limitCutNumber = limitCutNumberMap[correctedMatch];
    //   },
    //   durationSeconds: 20,
    //   infoText: (data, _matches, output) => {
    //     const expectedLimitCutNumbers = [1, 2, 3, 4];
    //     if (
    //       data.limitCutNumber === undefined ||
    //       !expectedLimitCutNumbers.includes(data.limitCutNumber)
    //     )
    //       return;
    //     return output.number({ num: data.limitCutNumber });
    //   },
    //   outputStrings: {
    //     number: {
    //       en: '${num}',
    //       de: '${num}',
    //       fr: '${num}',
    //       ja: '${num}',
    //       cn: '${num}',
    //       ko: '${num}',
    //     },
    //   },
    // },
    // {
    //   id: 'P9S Chimeric Limit Cut Defamation',
    //   type: 'HeadMarker',
    //   netRegex: {},
    //   condition: (data, matches) => {
    //     return data.seenChimericSuccession && data.me === matches.target &&
    //       data.limitCutNumber !== undefined &&
    //       limitCutMarkers.includes(getHeadmarkerId(data, matches));
    //   },
    //   delaySeconds: (data) => {
    //     if (data.limitCutNumber === undefined)
    //       return 0;
    //     const time = chimericLimitCutTime[data.limitCutNumber];
    //     if (time === undefined)
    //       return 0;
    //     // 6 seconds ahead of time
    //     return time - 6;
    //   },
    //   alarmText: (_data, _matches, output) => output.defamation(),
    //   outputStrings: {
    //     defamation: {
    //       en: 'Defamation on YOU',
    //       de: 'Ehrenstrafe aud DIR',
    //       fr: 'Diffamation sur VOUS',
    //       ja: '自分の巨大な爆発',
    //       cn: '大圈点名',
    //       ko: '광역징 대상자',
    //     },
    //   },
    // },
    // {
    //   // When Kokytos uses 'Scrambled Succession' (817D), there is ~4.0s. until the first tower appears (8181)
    //   // and about ~5.0s until he dashes and uses Firemeld (8180) on the #2 limit cut player.  Because these abilities
    //   // have very short (or no) cast times, we can base the first combo trigger on the use of Scrambled Succession, and
    //   // base subsequent combo triggers on the prior use of Firemeld (which is ~4.6s before the next tower spawns)
    //   id: 'P9S Limit Cut First Dash/Tower Combo',
    //   type: 'Ability',
    //   netRegex: { id: '817D', source: 'Kokytos', capture: false },
    //   condition: (data) => data.limitCutDash === 0,
    //   alertText: (data, _matches, output) => {
    //     const activePlayers = limitCutPlayerActive[data.limitCutDash];
    //     if (activePlayers === undefined)
    //       return;
    //     const [dashPlayer, soakPlayer] = activePlayers;
    //     if (dashPlayer === undefined || soakPlayer === undefined)
    //       return;
    //     if (data.limitCutNumber === dashPlayer)
    //       return output.dash();
    //     else if (data.limitCutNumber === soakPlayer)
    //       return output.soak();
    //     return;
    //   },
    //   outputStrings: {
    //     dash: {
    //       en: 'Bait dash',
    //       de: 'Sprung ködern',
    //       fr: 'Encaissez le saut',
    //       ja: '突進誘導',
    //       cn: '引导BOSS',
    //       ko: '돌진 유도',
    //     },
    //     soak: {
    //       en: 'Soak tower',
    //       de: 'Im Turm stehen',
    //       fr: 'Prenez votre tour',
    //       ja: '塔踏み',
    //       cn: '踩塔',
    //       ko: '기둥 들어가기',
    //     },
    //   },
    // },
    // {
    //   id: 'P9S Limit Cut Combo Tracker',
    //   type: 'Ability',
    //   netRegex: { id: '8180', source: 'Kokytos', capture: false },
    //   run: (data) => data.limitCutDash++,
    // },
    // {
    //   id: 'P9S Limit Cut Later Dash/Tower Combo',
    //   type: 'Ability',
    //   netRegex: { id: '8180', source: 'Kokytos', capture: false },
    //   condition: (data) => data.limitCutDash > 0 && data.limitCutDash < 4,
    //   delaySeconds: (data) => {
    //     // delay 'soak tower' call by 1 second to prevent confusion due to ability timing
    //     return limitCutPlayerActive[data.limitCutDash]?.[1] === data.limitCutNumber ? 1 : 0;
    //   },
    //   alertText: (data, _matches, output) => {
    //     const [dashPlayer, soakPlayer] = limitCutPlayerActive[data.limitCutDash] ?? [];
    //     if (dashPlayer === undefined || soakPlayer === undefined)
    //       return;
    //     if (data.limitCutNumber === dashPlayer)
    //       return output.dash();
    //     else if (data.limitCutNumber === soakPlayer)
    //       return output.soak();
    //     return;
    //   },
    //   outputStrings: {
    //     dash: {
    //       en: 'Bait dash',
    //       de: 'Sprung ködern',
    //       fr: 'Encaissez le saut',
    //       ja: '突進誘導',
    //       cn: '引导BOSS',
    //       ko: '돌진 유도',
    //     },
    //     soak: {
    //       en: 'Soak tower',
    //       de: 'Im Turm stehen',
    //       fr: 'Prenez votre tour',
    //       ja: '塔踏み',
    //       cn: '踩塔',
    //       ko: '기둥 들어가기',
    //     },
    //   },
    // },
    // {
    //   id: 'P9S Limit Cut 1 Defamation',
    //   type: 'HeadMarker',
    //   netRegex: {},
    //   condition: (data, matches) => {
    //     return data.me === matches.target &&
    //       getHeadmarkerId(data, matches) === headmarkers.defamation;
    //   },
    //   alarmText: (_data, _matches, output) => output.defamation(),
    //   outputStrings: {
    //     defamation: {
    //       en: 'Defamation on YOU',
    //       de: 'Ehrenstrafe aud DIR',
    //       fr: 'Diffamation sur VOUS',
    //       ja: '自分に巨大な爆発',
    //       cn: '大圈点名',
    //       ko: '광역징 대상자',
    //     },
    //   },
    // },
    // {
    
    
   
    
    
  ],
  
});
