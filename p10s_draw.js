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

const RotatePointFromCentre = (point, centre, angle) => {
  let rot=(1-(Math.atan2(point.x-centre.x,point.y-centre.y)/Math.PI))%2*180;
  let dis=Math.sqrt(Math.pow(point.x - centre.x, 2) + Math.pow((point.y - centre.y), 2));
  var end=new Object();
  end.x = centre.x+Math.sin((rot + angle) / 180 * Math.PI) * dis;
  end.y = centre.y-Math.cos((rot + angle) / 180 * Math.PI) * dis; 
  return end;
}





const bossNameUnicode = 'Pand\u00e6monium';
const headmarkers = {
  // vfx/lockon/eff/com_share6_5s0c.avfx
  soulGrasp: '01D3',
  // vfx/lockon/eff/m0834trg_b0c.avfx
  webShare: '01AC',
  // vfx/lockon/eff/m0834trg_d0c.avfx
  webEntangling: '01AE',
  // vfx/lockon/eff/m0834trg_a0c.avfx
  webSpread: '01AB', //大分散
  // vfx/lockon/eff/lockon5_t0h.avfx
  spread: '0017',
};
const firstHeadmarker = parseInt(headmarkers.soulGrasp, 16);
const getHeadmarkerId = (data, matches) => {
  if (data.decOffset === undefined)
    data.decOffset = parseInt(matches.id, 16) - firstHeadmarker;
  return (parseInt(matches.id, 16) - data.decOffset).toString(16).toUpperCase().padStart(4, '0');
};


Options.Triggers.push({
  id: 'AnabaseiosTheTenthCircleSavage_Draw',
  zoneId: ZoneId.AnabaseiosTheTenthCircleSavage,
  config: [
    {
      id: "AoeSendMode",
      name: { en: "Aoe发送方式" },
      type: "select",
      options: { en: { "网络": "Http", "管道": "Pipe" } },
      default: "Http",
    },
    
  ],
  initData: () => {
    return {
    };
  },
  triggers: [
    {
      id: 'P10S Headmarker Tracker',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data) => data.decOffset === undefined,
      // Unconditionally set the first headmarker here so that future triggers are conditional.
      run: (data, matches) => getHeadmarkerId(data, matches),
    },
    
    // 坦克死刑 
    // 4m 829f 82a0
    {
      id: 'P10S 坦克死刑',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data, matches) => getHeadmarkerId(data, matches) === headmarkers.soulGrasp,
      run: (data, matches) => {
        postAoe(`{"Name":"坦克死刑","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":4,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":10.5}`);
       },
    },
    // 大钢铁 36m
    {
      id: 'P10S 大钢铁',
      type: 'StartsUsing',
      netRegex: { id: '82A6'},
      run: (data, matches) => {
        postAoe(`{"Name":"钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":36,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":4}`);
       },
    },
    // 大月环 40m 12m pos: 100 85
    {
      id: 'P10S 大月环',
      type: 'StartsUsing',
      netRegex: { id: '82A7', source: bossNameUnicode, capture: false },
      run: (data, matches) => {
        postAoe(`{"Name":"月环","AoeType":"Donut","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":85},"Radius":40,"InnerRadius":12,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":4}`);
       },
    },
    // 双塔击飞 36m
    {
      id: 'P10S 双塔击飞',
      type: 'StartsUsing',
      netRegex: { id: '8299'},
      run: (data, matches) => {
        let dur=parseFloat(matches.castTime);
        if (data.Role === 'tank') {
          // postAoe(`{"Name":"双塔击飞 右","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":105.5,"Y":0,"Z":98.5},"Radius":0.3,"Color":1778450189,"Delay":0,"During":9.5}`);
          // postAoe(`{"Name":"双塔击飞 左","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":94.5,"Y":0,"Z":98.5},"Radius":0.3,"Color":1778450189,"Delay":0,"During":7}`);

          postAoe(`{"Name":"双塔击飞 右","AoeType":"Sector","CentreType":"PostionValue","CentreValue":{"X":108,"Y":0,"Z":100},"Radius":4,"Angle":45,"Rotation":112.5,"Color":2147548928,"Delay":0,"During":9.5}`);
          postAoe(`{"Name":"双塔击飞 左","AoeType":"Sector","CentreType":"PostionValue","CentreValue":{"X":92,"Y":0,"Z":100},"Radius":4,"Angle":45,"Rotation":-112.5,"Color":2147548928,"Delay":0,"During":7}`);
        }else{
          postAoe(`{"Name":"双塔击飞 右","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":108,"Y":0,"Z":100},"Radius":4,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":9.5}`);
          postAoe(`{"Name":"双塔击飞 左","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":92,"Y":0,"Z":100},"Radius":4,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":7}`);
        }
        
      },
    },
    // 大分散位置
    {
      id: 'P10S 大分散位置',
      type: 'HeadMarker',
      netRegex: {},
      run: (data, matches) => {
        let id= getHeadmarkerId(data, matches);
        if (id !='01AB' || parseInt(matches.targetId,16) != data.myId) return;
        var twPos = [
          { "X": 122, "Y": 0, "Z": 80 },//MT
          { "X": 78, "Y": 0, "Z": 80 },//ST
          { "X": 100, "Y": 0, "Z": 99 },//H1
          { "X": 100, "Y": 0, "Z": 114.5 },//H2
          { "X": 92, "Y": 0, "Z": 86 },//D1
          { "X": 108, "Y": 0, "Z": 86 },//D2
          { "X": 87.5, "Y": 0, "Z": 106.5 },//D3
          { "X": 112.5, "Y": 0, "Z": 106.5 },//D4
        ];
        postAoe(`{"Name":"大分散位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":${JSON.stringify(twPos[data.PartyIds.indexOf(data.myId)])},"Radius":0.5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":5.2}`);

        


       },
    },
    
    //分割之翼连线 6s
    {
      id: 'P10S 分割之翼连线扇形',
      type: 'Tether',
      netRegex: { id: '00F2'},
      run: (data, matches) => {
        if (data.分割之翼===undefined) data.分割之翼=0;

        data.分割之翼++;
        let d=3;
        let dur=3;
        if (data.分割之翼==3||data.分割之翼==4) {
          d=d+3;
        }
        if (parseInt(matches.targetId,16) == data.myId) {
          d=d-3;
          dur=dur+3;
        }
        postAoe(`{"Name":"分割之翼连线扇形","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Radius":60,"Angle":120,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":${d},"During":${dur}}`);
       },
    },
    
    // boss读条踩前中后小塔
    {
      id: 'P10S 读条踩前中后小塔',
      type: 'StartsUsing',
      netRegex: { id: '8280'},
      run: (data, matches) => {
        var twPos = [
          { "X": 108, "Y": 0, "Z": 91 },//MT
          { "X": 92, "Y": 0, "Z": 91 },//ST
          { "X": 100, "Y": 0, "Z": 92 },//H1
          { "X": 100, "Y": 0, "Z": 104.5 },//H2
          { "X": 92, "Y": 0, "Z": 102 },//D1
          { "X": 108, "Y": 0, "Z": 102 },//D2
          { "X": 92, "Y": 0, "Z": 111.5 },//D3
          { "X": 108, "Y": 0, "Z": 111.5 },//D4
        ];
        postAoe(`{"Name":"读条踩前中后小塔","AoeType":"Circle","CentreType":"PostionValue","CentreValue":${JSON.stringify(twPos[data.PartyIds.indexOf(data.myId)])},"Radius":2,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":5.2}`);

      },
    },
    // boss读条踩前后引导小塔
    {
      id: 'P10S 踩前后引导小塔',
      type: 'StartsUsing',
      netRegex: { id: '87AF'},
      run: (data, matches) => {

        var twPos = [
          { "X": 96.5, "Y": 0, "Z": 88 },//MT
          { "X": 103.5, "Y": 0, "Z": 88 },//ST
          { "X": 96.5, "Y": 0, "Z": 112 },//H1
          { "X": 103.5, "Y": 0, "Z": 112 },//H2
          { "X": 90, "Y": 0, "Z": 88 },//D1
          { "X": 110, "Y": 0, "Z": 88 },//D2
          { "X": 90, "Y": 0, "Z": 112 },//D3
          { "X": 110, "Y": 0, "Z": 112 },//D4
        ];

        postAoe(`{"Name":"读条踩前中后小塔","AoeType":"Circle","CentreType":"PostionValue","CentreValue":${JSON.stringify(twPos[data.PartyIds.indexOf(data.myId)])},"Radius":2,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":6.2}`);


      },
    },
    {
      id: 'P10S 引导小塔aoe',
      type: 'HeadMarker',
      netRegex: {},
      run: (data, matches) => {
        let id= getHeadmarkerId(data, matches);
        // console.log(id);
        //150 151 152 153
        if (id=='0150' || id=='0151' || id=='0152' || id=='0153') {
          let n=parseInt(id,16)-336;
          postAoe(`{"Name":"引导小塔aoe","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.targetId},"TrackType":"Nearest","TrackValue":1,"Length":50,"Width":5.0,"Rotation":0.0,"Color":1073807359,"Delay":${3.5+n*4.5},"During":4.5}`)
        }
       },
    },

    // 小塔aoe
    // 87B0直线
    // 8285钢铁 4m
    // 8287月环 8m 3m
    {
      id: 'P10S 小塔aoe',
      type: 'StartsUsing',
      netRegex: { id: ['87B0','8285','8287']},
      run: (data, matches) => {
        if (matches.id == '87B0') {
          postAoe(`{"Name":"小塔直线aoe","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":50,"Width":7,"Rotation":0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":3}`)
        }
        if (matches.id == '8285') {
          postAoe(`{"Name":"小塔钢铁aoe","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":4,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":3.5}`)
        }
        if (matches.id == '8287') {
          postAoe(`{"Name":"小塔月环aoe","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":8,"InnerRadius":3,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":3.5}`)
        }
      },
    },
    
    //万魔殿熔毁 直线
    {
      id: 'P10S 万魔殿熔毁 直线',
      // These come out before the meltdown cast below.
      type: 'HeadMarker',
      netRegex: {},
      condition: (data, matches) => getHeadmarkerId(data, matches) === headmarkers.spread,
      run: (data, matches) => {
        postAoe(`{"Name":"万魔殿熔毁 直线","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":70},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Length":50,"Width":4,"Rotation":0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":5.7}`);
       },
    },
    //万魔殿熔毁 分摊
    { 
      id: 'P10S 万魔殿熔毁 分摊',
      type: 'Ability',
      netRegex: { id: '6854'},
      run: (data, matches) => {
        postAoe(`{"Name":"Rect Example","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Length":50,"Width":6,"Rotation":0,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":5.7}`);
       },
    },


    // 万魔之链
    // DDE 分散 82a2 6m
    // DDF 2222分摊 82a3 4m
    // E70 44分摊 87ae 4m
    {
      id: 'P10S 万魔之链 Aoe指示',
      type: 'GainsEffect',
      netRegex: { effectId: ['E70','DDE','DDF'] },
      run: (data, matches) => {
        var d=parseFloat(matches.duration)-3;
        if (matches.effectId=='E70') {
          postAoe(`{"Name":"44分摊","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":4,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":${d},"During":3}`)
        }
        if (matches.effectId=='DDF') {
          postAoe(`{"Name":"2222分摊","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":4,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":${d},"During":3}`)
        }
        if (matches.effectId=='DDE') {
          postAoe(`{"Name":"分散","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":4,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":${d},"During":3}`)
        }
      },
    },

    //半场刀 长13 宽30 8289东安全
    {
      id: 'P10S 半场刀',
      type: 'StartsUsing',
      netRegex: { id: ['8289', '828B']},
      run: (data, matches) => {
        if (matches.id=='8289') {
          postAoe(`{"Name":"半场刀西","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":100},"Length":13,"Width":30,"Rotation":90,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":5}`);
        } else {
          postAoe(`{"Name":"半场刀东","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":100},"Length":13,"Width":30,"Rotation":-90,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":5}`);
        }
      },
    },
    //半场刀后直线aoe 前19.5后6.5 2m
    {
      id: 'P10S 半场刀后直线aoe',
      // Track addition of Arcane Sphere combatants
      type: 'AddedCombatant',
      netRegex: { npcNameId: '12356' },
      run: (data, matches) => {
        postAoe(`{"Name":"半场刀后直线aoe前","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.id},"Length":19.5,"Width":2,"Rotation":0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":3.5}`);
        postAoe(`{"Name":"半场刀后直线aoe后","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.id},"Length":6.5,"Width":2,"Rotation":180,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":3.5}`);
      },
    },
  ],
  
});
