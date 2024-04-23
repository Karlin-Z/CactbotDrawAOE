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
function removeAoe(data) {
  if (pipeAoe){
    sendExtraLogCommand(`Remove`,data);
  }else{
    fetch(`http://127.0.0.1:${aoeport}/Remove`, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: data
    });
  }
}
const sendExtraLogCommand = (command,info) => {
  callOverlayHandler({ call: 'ExtraLog', c: `${command}`, p: `${info}` });
}
Options.Triggers.push({
  id: 'TheAbyssalFractureExtreme_Draw',
  zoneId: ZoneId.TheAbyssalFractureExtreme,
  
  initData: () => {
    removeAoe(`RemoveAll`);
    return {
    };
  },
  
  triggers: [
    { id: 'ZeromusEx 利爪后续X',
      type: 'StartsUsing',
      netRegex: { id: '8B49'},
      run: async (data, matches) => {
        
        postAoe(`{"Name":"利爪后续X1","AoeType":"Straight","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":80.0,"Width":10.0,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":8}`);
        postAoe(`{"Name":"利爪后续X2","AoeType":"Straight","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":80.0,"Width":10.0,"Rotation":90.0,"Color":1073807359,"Delay":0,"During":8}`);
        
          
      },
    },
    { id: 'ZeromusEx 圆形地火',
      type: 'StartsUsing',
      netRegex: { id: '8B42'},
      run: async (data, matches) => {
        postAoe(`{"Name":"ZeromusEx 圆形地火","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":12,"Color":1073807359,"Delay":11,"During":5}`);
      },
    },
    { id: 'ZeromusEx 踩塔后续aoe',
      type: 'StartsUsing',
      netRegex: { id: '8B63'},
      run: async (data, matches) => {
        postAoe(`{"Name":"ZeromusEx 踩塔后续aoe 直线","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":60.0,"Width":10.0,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":5}`);
        postAoe(`{"Name":"ZeromusEx 踩塔后续aoe 圆形","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":5,"Color":1073807359,"Delay":0,"During":5}`);
      },
    },
    { id: 'ZeromusEx 黑洞 黑洞',
      type: 'CombatantMemory',
      netRegex: {
        id: '40[0-9A-F]{6}',
        change:'Add',
        pair: [{ key: 'BNpcID', value: '1EB94C' }],
        capture: true,
      },
      run: async (data, matches) => {
        postAoe(`{"Name":"ZeromusEx 黑洞 黑洞","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.id},"Radius":35,"Color":1073807359,"Delay":0,"During":16.5}`);
      },
    },
    { id: 'ZeromusEx 黑洞黑龙闪',
      type: 'StartsUsing',
      netRegex: { id: '8B3E'},
      run: async (data, matches) => {
        postAoe(`{"Name":"ZeromusEx 黑洞黑龙闪","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":60.0,"Width":8.0,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":19.5}`);
      },
    },
    { id: 'ZeromusEx 毒球体积',
      type: 'AddedCombatant',
      netRegex: { npcNameId: '12588'},
      run: (data, matches) => {
        postAoe(`{"Name":"ZeromusEx 踩塔后续aoe 圆形","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.id},"Radius":1.7,"Color":1073807359,"Delay":0,"During":20}`);
      },
    },
    { id: 'ZeromusEx 陨石体积1',
      type: 'StartsUsing',
      netRegex: { id: '8B5C'},
      run: async (data, matches) => {
        postAoe(`{"Name":"ZeromusEx 陨石体积1","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":2,"Color":1073807359,"Delay":0,"During":99}`);
      },
    },
    { id: 'ZeromusEx 陨石体积2',
      type: 'Ability',
      netRegex: { id: '8B58'},
      run: async (data, matches) => {
        postAoe(`{"Name":"ZeromusEx 陨石体积2","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":2,"Color":1073807359,"Delay":0,"During":99}`);
      },
    },
    { id: 'ZeromusEx 陨石自身体积',
      type: 'StartsUsing',
      netRegex: { id: '8B56' },
      run: async (data, matches) => {
        postAoe(`{"Name":"ZeromusEx 陨石体积3","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.myId},"Radius":2,"Color":1073807359,"Delay":5,"During":99}`);
      },
    },
    { id: 'ZeromusEx 陨石自身体积清除',
      type: 'Ability',
      netRegex: { id: '8B58'},
      run: async (data, matches) => {
        if (parseInt(matches.targetId,16)==data.myId) {
          removeAoe(`ZeromusEx 陨石体积3`);
        }
      },
    },
    { id: 'ZeromusEx 陨石后分摊',
      type: 'GainsEffect',
      netRegex: { effectId: 'ED2'},
      run: async (data, matches) => {
        var dur= parseFloat(matches.duration);
        postAoe(`{"Name":"ZeromusEx 陨石后分摊","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":6,"Color":1073807104,"Delay":${dur-5},"During":5}`);
      },
    },
    { id: 'ZeromusEx 陨石后分散',
      type: 'GainsEffect',
      netRegex: { effectId: 'ED7'},
      run: async (data, matches) => {
        var dur= parseFloat(matches.duration);
        postAoe(`{"Name":"ZeromusEx 陨石后分散","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":5,"Color":1073807359,"Delay":${dur-5},"During":5}`);
      },
    },
    { id: 'ZeromusEx 陨石体积清除',
      type: 'StartsUsing',
      netRegex: { id: '8D34'},
      suppressSeconds: 1,
      run: async (data, matches) => {
        removeAoe(`ZeromusEx 陨石体积1`);
        removeAoe(`ZeromusEx 陨石体积2`);
      },
    },
    { id: 'ZeromusEx 踩塔后分散',
      type: 'StartsUsing',
      netRegex: { id: '8B64'},
      run: async (data, matches) => {
        postAoe(`{"Name":"ZeromusEx 踩塔后分摊","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":4,"Color":1073807359,"Delay":3,"During":7}`);
      },
    },
    { id: 'ZeromusEx 踩塔后分摊',
      type: 'StartsUsing',
      netRegex: { id: '8B65'},
      run: async (data, matches) => {
        postAoe(`{"Name":"ZeromusEx 踩塔后分摊","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":4,"Color":1073807104,"Delay":3,"During":7}`);
      },
    },
    { id: 'ZeromusEx 踩塔后地火',
      type: 'StartsUsing',
      netRegex: { id: '8D2A' },
      run: async (data, matches) => {
        postAoe(`{"Name":"ZeromusEx 踩塔后地火","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":10,"Color":1073807359,"Delay":5,"During":6.3}`);
      },
    },
    { id: 'ZeromusEx 场边直线',
      type: 'StartsUsing',
      netRegex: { id: '8B82'},
      run: async (data, matches) => {
        postAoe(`{"Name":"ZeromusEx 场边直线","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":40.0,"Width":14.0,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":9}`);
      },
    },
    { id: 'ZeromusEx 天光轮回1',
      type: 'HeadMarker',
      netRegex: { id: '0017' },
      run: async (data, matches) => {
        postAoe(`{"Name":"ZeromusEx 天光轮回1","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":5,"Color":1073807359,"Delay":0,"During":5.5}`);
        data.tg=[];
      },
    },
    { id: 'ZeromusEx 天光轮回2',
      type: 'Ability',
      netRegex: { id: '8B75' },
      run: async (data, matches) => {
        if(data.tg.indexOf(matches.sourceId)==-1)
        {
          postAoe(`{"Name":"ZeromusEx 天光轮回2","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":5,"Color":1073807359,"Delay":0,"During":5.2}`);
          data.tg.push(matches.sourceId);
        }
      },
    },
    { id: 'ZeromusEx 五连扇形第一刀',
      type: 'StartsUsing',
      netRegex: { id: '8B79'},
      run: async (data, matches) => {
        postAoe(`{"Name":"ZeromusEx 五连扇形第一刀","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":60,"Angle":40.0,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":7.7}`);
        postAoe(`{"Name":"ZeromusEx 五连扇形第一刀 安全","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":60,"Angle":40.0,"Rotation":0.0,"Color":65280,"Delay":7.7,"During":2.8}`);
      },
    },
    { id: 'ZeromusEx 五连扇形第二刀',
      type: 'StartsUsing',
      netRegex: { id: '8B7A'},
      run: async (data, matches) => {
        postAoe(`{"Name":"ZeromusEx 五连扇形第二刀","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":60,"Angle":40.0,"Rotation":0.0,"Color":1073773311,"Delay":0,"During":8.5}`);
      },
    },
   



  ],
 
});
