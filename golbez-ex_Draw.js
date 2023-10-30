let pipeAoe=true;
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

const RotatePointFromCentre = (point, centre, angle) => {
  let rot=(1-(Math.atan2(point.x-centre.x,point.y-centre.y)/Math.PI))%2*180;
  let dis=Math.sqrt(Math.pow(point.x - centre.x, 2) + Math.pow((point.y - centre.y), 2));
  var end=new Object();
  end.x = centre.x+Math.sin((rot + angle) / 180 * Math.PI) * dis;
  end.y = centre.y-Math.cos((rot + angle) / 180 * Math.PI) * dis; 
  return end;
}

const firstHeadmarker = parseInt('0158', 16);
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
Options.Triggers.push({
  id: 'TheVoidcastDaisExtreme_Draw',
  zoneId: ZoneId.TheVoidcastDaisExtreme,
  config: [
    {
      id: "AoeSendMode",
      name: { en: "Aoe发送方式" },
      type: "select",
      options: { en: { "网络": "Http", "管道": "Pipe" } },
      default: "Http",
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
    return {
      
    };
  },
  triggers: [

    // 头顶点名解析
    {
      id: 'GolbezEx Headmarker Tracker',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data) => data.decOffset === undefined,
      suppressSeconds: 99999,
      // Unconditionally set the first headmarker here so that future triggers are conditional.
      run: (data, matches) => getHeadmarkerId(data, matches),
    },
    
    // 斜角陨石
    {
      id: 'GolbezEx 斜角陨石',
      type: 'StartsUsing',
      netRegex: { id: '8466',},
      run: (data, matches) => {
       postAoe(`{"Name":"斜角陨石","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":16,"Color":1073807359,"Delay":0,"During":8}`)
      },
    },
    // 旋风
    { 
      id: 'GolbezEx 旋风提示',
      type: 'StartsUsing',
      netRegex: { id: '8468'},
      delaySeconds:4,
      run: async (data, matches) => {
        var cs = (await callOverlayHandler({
          call: 'getCombatants',
          ids: data.PartyIds,
        })).combatants;
        for (let i = 0; i < 8; i++) {
          postAoe(`{"Name":"旋风${i}","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${cs[i].PosX},"Y":0,"Z":${cs[i].PosY}},"Radius":5,"Color":1073807359,"Delay":0,"During":3}`);
          
        }
      },
    },
    // 前后刀
    {
      id: 'GolbezEx 前刀',
      type: 'StartsUsing',
      netRegex: { id: ['86DB','86E7']},
      run: (data, matches) => {
        postAoe(`{"Name":"普通前刀","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":22,"Angle":180,"Rotation":0.0,"Color":1073807359,"Delay":0.2,"During":4.8}`)
       },
    },
    {
      id: 'GolbezEx 后刀',
      type: 'StartsUsing',
      netRegex: { id: ['86F2','86EF']},
      run: (data, matches) => {
        postAoe(`{"Name":"普通后刀","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":22,"Angle":180,"Rotation":180,"Color":1073807359,"Delay":5,"During":3.3}`)
       },
    },
    // 钢铁aoe
    {
      id: 'GolbezEx 钢铁aoe',
      type: 'StartsUsing',
      netRegex: { id: '86EC'},
      run: (data, matches) => {
        postAoe(`{"Name":"钢铁aoe","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":10,"Color":1073807359,"Delay":0,"During":9.5}`)
       },
    },
    // 月环aoe
    {
      id: 'GolbezEx 月环aoe',
      type: 'StartsUsing',
      netRegex: { id: '86ED'},
      run: (data, matches) => {
        postAoe(`{"Name":"Donut Example","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":22,"InnerRadius":6,"Color":1073807359,"Delay":0,"During":9.5}`)
       },
    },
    // 风球aoe
    {
      id: 'GolbezEx 风球',
      type: 'StartsUsing',
      netRegex: { id: ['8458','8459','845A','845B']},
      run: (data, matches) => {
        var t=parseFloat(matches.castTime);
        var d=t-3.5;
        postAoe(`{"Name":"风球aoe","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":30,"Width":5.0,"Rotation":0,"Color":1073807359,"Delay":${d},"During":3.5}`)
       },
    },
    // 冰刺aoe
    {
      id: 'GolbezEx 冰刺aoe',
      type: 'StartsUsing',
      netRegex: { id: '8461'},
      run: (data, matches) => {
        
        postAoe(`{"Name":"冰刺aoe","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":15,"Width":15,"Rotation":0,"Color":1073807359,"Delay":0,"During":4}`)
       },
    },
    // 陨石
    {
      id: 'GolbezEx 陨石清零',
      type: 'StartsUsing',
      netRegex: { id: '84A6' },
      suppressSeconds: 1,
      run: (data, matches) => {
        data.陨石计数=0;
      },
    },
    {
      id: 'GolbezEx 陨石',
      type: 'StartsUsing',
      netRegex: { id: ['84A8'] },
      promise:(data, matches) => {
        data.陨石计数++;
      },
      
      run: async (data, matches) => {
        var cs = (await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        })).combatants;
        var c=cs[0];
        // 1073807359
        if (data.陨石计数<5) {
          postAoe(`{"Name":"陨石","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${c.PosX},"Y":0,"Z":${c.PosY}},"Radius":6,"Color":1073807359,"Delay":0,"During":4}`);
        }
        if (data.陨石计数>8) {
          postAoe(`{"Name":"陨石","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${c.PosX},"Y":0,"Z":${c.PosY}},"Radius":6,"Color":1073807104,"Delay":0,"During":4}`);
        }
        
      },
    },
    { 
      id: 'GolbezEx 陨石疾跑',
      type: 'Ability',
      netRegex: { id: '84A8'},
      suppressSeconds:9999,
      alertText: (data, matches, output) => {
          return '开疾跑';
      },
    },
    { 
      id: 'GolbezEx 陨石横穿提示',
      type: 'Ability',
      netRegex: { id: '84AA'},
      suppressSeconds:9999,
      alertText: (data, matches, output) => {
          return '走走走';
      },
    },

    //击退
    {
      id: 'GolbezEx 击退踩塔 击退',
      type: 'HeadMarker',
      netRegex: {},
      run: (data, matches) => {
        const correctedMatch = getHeadmarkerId(data, matches);
        if (correctedMatch=='01DA' && matches.target!=data.me) {
          postAoe(`{"Name":"击退踩塔 击退","AoeType":"Repel","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Length":12,"Thikness":10,"Color":4278255360,"Delay":0,"During":8}`);
        }
      },
    },
    //陨石
    {
      id: 'GolbezEx 击退踩塔 陨石',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data, matches) => {return getHeadmarkerId(data, matches) === '01D9' && matches.target==data.me} ,
      alertText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          cn: '陨石点名',
        },
      },
    },
    {
      id: 'GolbezEx 击退踩塔 黑炎俯冲',
      type: 'Tether',
      netRegex: { id: '0011'},
      run: (data, matches) => {
        postAoe(`{"Name":"击退踩塔 黑炎俯冲","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Length":40,"Width":12,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":4}`)
       },
    },
    {
      id: 'GolbezEx 集束黑龙闪 治疗分摊',
      type: 'StartsUsing',
      netRegex: { id: '8485' },
      run: (data, matches) => {
        postAoe(`{"Name":"集束黑龙闪 治疗分摊","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":${data.PartyIds[2]},"Length":50,"Width":6,"Rotation":0.0,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":9.5}`);
        postAoe(`{"Name":"集束黑龙闪 治疗分摊","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":${data.PartyIds[3]},"Length":50,"Width":6,"Rotation":0.0,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":9.5}`);
      },
    },
    {
      id: 'GolbezEx 虚空龙卷 治疗分摊',
      type: 'StartsUsing',
      netRegex: { id: ['845D','8462']},
      run: (data, matches) => {
        postAoe(`{"Name":"虚空龙卷 治疗分摊","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":6,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":6}`)
        },
    },
    
    // {
    //   id: 'GolbezEx Abyssal Quasar',
    //   type: 'StartsUsing',
    //   netRegex: { id: '84AB', source: 'Golbez', capture: false },
    //   alertText: (_data, _matches, output) => output.partnerStack(),
    //   outputStrings: {
    //     partnerStack: {
    //       en: 'Partner Stack',
    //       de: 'Mit Partner sammeln',
    //       fr: 'Package partenaire',
    //       ja: 'ペア',
    //       cn: '2 人分摊',
    //       ko: '2인 쉐어',
    //     },
    //   },
    // },
    // {
    //   id: 'GolbezEx Eventide Triad',
    //   type: 'StartsUsing',
    //   netRegex: { id: '8480', source: 'Golbez', capture: false },
    //   alertText: (_data, _matches, output) => output.rolePositions(),
    //   outputStrings: {
    //     rolePositions: {
    //       en: 'Role positions',
    //       de: 'Rollenposition',
    //       fr: 'Positions par rôle',
    //       ja: '4:4あたまわり',
    //       cn: '去指定位置',
    //       ko: '직업군별 위치로',
    //     },
    //   },
    // },
    
    // {
    //   id: 'GolbezEx Void Aero III',
    //   type: 'StartsUsing',
    //   netRegex: { id: '845C', source: 'Golbez', capture: false },
    //   alertText: (_data, _matches, output) => output.partnerStack(),
    //   outputStrings: {
    //     partnerStack: {
    //       en: 'Partner Stack',
    //       de: 'Mit Partner sammeln',
    //       fr: 'Package partenaire',
    //       ja: 'ペア',
    //       cn: '2 人分摊',
    //       ko: '2인 쉐어',
    //     },
    //   },
    // },
    
  ],
  
});
