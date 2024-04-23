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
function tp(data) {
    // fetch(`http://127.0.0.1:${9909}/Setting`, {
    //   method: "POST",
    //   mode: "no-cors",
    //   headers: { "Content-Type": "application/json" },
    //   body: `TP ${data}`
    // });
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

const partnerMap={
  0:6,
  1:5,
  2:4,
  3:7,
  4:2,
  5:1,
  6:0,
  7:3,  
}

const 调停partnerMap={
  0:5,
  1:4,
  2:7,
  3:6,
  4:1,
  5:0,
  6:3,
  7:2,  
}

const headmarkers = {
  // vfx/lockon/eff/tank_lockon04_7sk1.avfx
  dike: '01DB',
  // vfx/lockon/eff/com_share4a1.avfx
  styx: '0131',
  // vfx/lockon/eff/m0515_turning_right01c.avfx
  orangeCW: '009C',
  // vfx/lockon/eff/m0515_turning_left01c.avfx
  blueCCW: '009D', // blue counterclockwise rotation
};
const firstHeadmarker = parseInt(headmarkers.dike, 16);
const getHeadmarkerId = (data, matches) => {
  if (data.decOffset === undefined)
    data.decOffset = parseInt(matches.id, 16) - firstHeadmarker;
  return (parseInt(matches.id, 16) - data.decOffset).toString(16).toUpperCase().padStart(4, '0');
};
Options.Triggers.push({
  id: 'AnabaseiosTheEleventhCircleSavage_Draw',
  zoneId: ZoneId.AnabaseiosTheEleventhCircleSavage,
  initData: () => {
    return {
      调停点名:[4,4,4,4,0,0,0,0],
      调停连线记录:[false,false,false,false,false,false,false,false],
      调停buff记录:[false,false,false,false,false,false,false,false],
    };
  },
  triggers: [
    {
      id: 'P11S 头顶点名解析',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data) => data.decOffset === undefined,
      suppressSeconds: 99999,
      // Unconditionally set the first headmarker here so that future triggers are conditional.
      run: (data, matches) => getHeadmarkerId(data, matches),
    },

    //分P
    {
      id: 'P11S 分P',
      type: 'StartsUsing',
      netRegex: { id: ['8219', '81FE', '87D2'], source: 'Themis' },
      run: (data, matches) => {
        data.upheldTethers = [];
        const phaseMap = {
          '8219': 'messengers',
          '81FE': 'darkLight',
          '87D2': 'letter',
        };
        data.phase = phaseMap[matches.id];
      },
    },

    // 集合分摊
    {
      id: 'P11S 集合分摊',
      type: 'StartsUsing',
      netRegex: { id: '8217'},
      run: (data, matches) => {
        if (data.分摊次数===undefined) data.分摊次数=4;
        data.分摊次数++;
        let dur=5+data.分摊次数*1.2;
        postAoe(`{"Name":"集合分摊","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":6,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":${dur}}`);
      },
      
    },
    // 陪审否决 光暗八方
    {
      id: 'P11S 陪审否决 光暗八方',
      type: 'StartsUsing',
      netRegex: { id: ['81E6','81E7']},
      run: (data, matches) => {
        for (let i = 0; i < 8; i++) {
          postAoe(`{"Name":"陪审否决 光暗八方 ${data.PartyInfos[i].Name}","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":${data.PartyIds[i]},"Length":50,"Width":8,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":4.5,"During":3.3}`);
        }
      },
    },
    // 陪审否决 光暗八方 原地钢铁
    {
      id: 'P11S 陪审否决 光暗八方 原地钢铁',
      type: 'StartsUsing',
      netRegex: { id: '81EA'},
      run: (data, matches) => {
       postAoe(`{"Name":"陪审否决 光八方 原地钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":5,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":3.1}`);
      },
    },
    // 陪审否决 光八方 治疗分摊
    {
      id: 'P11S 陪审否决 光八方 治疗分摊',
      type: 'Ability',
      netRegex: { id: '81E8'},
      suppressSeconds:1,
      run: async (data, matches) => {
        if (data.调停) {
          // 0 暗远Dps
          // 1 光远Dps
          // 2 暗近Dps
          // 3 光近Dps
          // 4 暗远TN
          // 5 光远TN
          // 6 暗近TN
          // 7 光近TN
          var H1Light = data.调停点名[2] % 2 == 1;
          var index = data.调停点名[data.PartyIds.indexOf(data.myId)];
          var leftPart = (index == 0 || index == 2 || index == 5 || index == 7);
          console.log(`${H1Light}|${leftPart}`);
          if ((H1Light && leftPart) || (!H1Light && !leftPart)) {
            postAoe(`{"Name":"调停 陪审否决 光八方 治疗分摊H1","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[2]},"Radius":6,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":5}`);
            postAoe(`{"Name":"调停 陪审否决 光八方 治疗分摊H2","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[3]},"Radius":6,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":5}`);
          }
          else {
            postAoe(`{"Name":"调停 陪审否决 光八方 治疗分摊H1","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[2]},"Radius":6,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":5}`);
            postAoe(`{"Name":"调停 陪审否决 光八方 治疗分摊H2","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[3]},"Radius":6,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":5}`);
          }
        } else {
          var index = data.PartyIds.indexOf(data.myId);
          if (index == 0 || index == 2 || index == 4 || index == 6) {
            postAoe(`{"Name":"陪审否决 光八方 治疗分摊H1","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[2]},"Radius":6,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":5}`);
            postAoe(`{"Name":"陪审否决 光八方 治疗分摊H2","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[3]},"Radius":6,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":5}`);
          } else {
            postAoe(`{"Name":"陪审否决 光八方 治疗分摊H1","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[2]},"Radius":6,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":5}`);
            postAoe(`{"Name":"陪审否决 光八方 治疗分摊H2","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[3]},"Radius":6,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":5}`);
          }
        }


      },
    },
    //陪审否决 暗八方 原地月环 
    {
      id: 'P11S 陪审否决 光暗八方 原地月环',
      type: 'StartsUsing',
      netRegex: { id: '81EB'},
      run: (data, matches) => {
       postAoe(`{"Name":"陪审否决 光暗八方 原地月环","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":9,"InnerRadius":2,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":3.1}`);
      },
    },
    //陪审否决 暗八方 22分摊
    {
      id: 'P11S 陪审否决 暗八方 22分摊',
      type: 'Ability',
      netRegex: { id: '81E9'},
      suppressSeconds:1,
      run: async (data, matches) => {
        if (data.调停) {
          var index = data.调停点名.indexOf(调停partnerMap[data.调停点名[data.PartyIds.indexOf(data.myId)]]);
          postAoe(`{"Name":"调停 陪审否决 暗八方 22分摊","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[index]},"Radius":3,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":5}`);
        } else {
          postAoe(`{"Name":"陪审否决 暗八方 22分摊","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[partnerMap[data.PartyIds.indexOf(data.myId)]]},"Radius":3,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":5}`);
        }
      },
    },


    // 维持否决连线
    {
      id: 'P11S 维持否决连线',
      type: 'Tether',
      netRegex: { id: '00F9' },
      run: (data, matches) => {
        let id=parseInt(matches.targetId,16);
        if (data.PartyInfos[data.PartyIds.indexOf(id)].Role==1) {
          data.维持否决暗=id;
        }else{
          data.维持否决光=id;
        }
      },
    },
    //维持否决 光
    {
      id: 'P11S 维持否决 光',
      type: 'StartsUsing',
      netRegex: { id: ['87D3','87D0']},
      run: (data, matches) => {
        let dur=matches.id=='87D3' ? 7.7:4;
        let delay=matches.id=='87D3' ? 0:7;
        postAoe(`{"Name":"维持否决 光 单独","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.维持否决光},"Radius":6,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":${delay},"During":${dur}}`);
      },
    },
    //维持否决 光钢铁
    {
      id: 'P11S 维持否决 光 钢铁',
      type: 'StartsUsing',
      netRegex: { id: ['81F6','8224']},
      run: (data, matches) => {
        postAoe(`{"Name":"维持否决 光 钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":13,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":3.5}`);
      },
    },
    //维持否决 光分摊
    {
      id: 'P11S 维持否决 光分摊',
      type: 'Ability',
      netRegex: { id: '81F2', capture: false },
      suppressSeconds: 5,
      run: async (data, matches) => {
        let index = data.PartyIds.indexOf(data.myId);
        if (index == 0 || index == 2 || index == 4 || index == 6) {
          postAoe(`{"Name":"P11S 维持否决 光分摊H1","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[2]},"Radius":6,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":4.2}`);
          postAoe(`{"Name":"P11S 维持否决 光分摊H2","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[3]},"Radius":6,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":4.2}`);
        } else {
          postAoe(`{"Name":"P11S 维持否决 光分摊H1","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[2]},"Radius":6,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":4.2}`);
          postAoe(`{"Name":"P11S 维持否决 光分摊H2","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[3]},"Radius":6,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":4.2}`);
        }
      },
    },
    //维持否决 暗
    {
      id: 'P11S 维持否决 暗',
      type: 'StartsUsing',
      netRegex: { id: ['87D4','87D1']},
      run: (data, matches) => {
        let dur=matches.id=='87D4' ? 7.7:4;
        let delay=matches.id=='87D4' ? 0:7;
        postAoe(`{"Name":"维持否决 暗","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.维持否决暗},"Radius":13,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":${delay},"During":${dur}}`);
        if (data.维持否决暗===data.myId && matches.id=='87D1' && !data.北边拉暗线) {
          data.北边拉暗线=true;
          postAoe(`{"Name":"戒律 维持否决 暗 a点","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":{"X":100,"Y":0,"Z":84},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":6,"During":5}`);
          setTimeout(() => {
            tp(`{"X":100,"Y":0,"Z":84}`);
          }, 7000);
        }
      },
    },
    //维持否决 暗月环
    {
      id: 'P11S 维持否决 暗 月环',
      type: 'StartsUsing',
      netRegex: { id: ['81F7','8225']},
      run: (data, matches) => {
        postAoe(`{"Name":"P11S 维持否决 暗 月环","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":22,"InnerRadius":8,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":3.5}`);
      },
    },
    //维持否决 暗分摊
    {
      id: 'P11S 维持否决 暗分摊',
      type: 'Ability',
      netRegex: { id: '81F3', capture: false },
      suppressSeconds: 5,
      run: async (data, matches) => {
        let pid= data.PartyIds[partnerMap[data.PartyIds.indexOf(data.myId)]];
        for (let i = 0; i < 4; i++) {
          if (data.PartyIds[i]==pid || data.PartyIds[i]==data.myId) {
            var col=data.triggerSetConfig.SafeAoeCol;
          }else{
            var col=data.triggerSetConfig.DangerAoeCol;
          }
          postAoe(`{"Name":"P11S 维持否决 暗分摊","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[i]},"Radius":3,"Color":${col},"Delay":0,"During":4.2}`);
        }
      },
    },

    // P11S 驳回否决 门Aoe
    {
      id: 'P11S 驳回否决 门Aoe',
      type: 'StartsUsing',
      netRegex: { id: ['8213','8214']},
      run: (data, matches) => {
        postAoe(`{"Name":"P11S 驳回否决 门Aoe","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":50,"Width":10,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":5.5}`);
      },
    },
    // P11S 驳回否决 光钢铁 44分摊
    {
      id: 'P11S 驳回否决 光钢铁',
      type: 'StartsUsing',
      netRegex: { id: '8788'},
      run: (data, matches) => {
        postAoe(`{"Name":"驳回否决 光钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":13,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":7.5,"During":3}`);

        let index = data.PartyIds.indexOf(data.myId);
        if (index == 0 || index == 2 || index == 4 || index == 6) {
          postAoe(`{"Name":"P11S 驳回否决 光分摊H1","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[2]},"Radius":6,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":7.5,"During":3}`);
          postAoe(`{"Name":"P11S 驳回否决 光分摊H2","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[3]},"Radius":6,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":7.5,"During":3}`);
        } else {
          postAoe(`{"Name":"P11S 驳回否决 光分摊H1","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[2]},"Radius":6,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":7.5,"During":3}`);
          postAoe(`{"Name":"P11S 驳回否决 光分摊H2","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[3]},"Radius":6,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":7.5,"During":3}`);
        }
      },
    },
    // P11S 驳回否决 暗月环 22分摊
    {
      id: 'P11S 驳回否决 暗月环',
      type: 'StartsUsing',
      netRegex: { id: '8789'},
      run: (data, matches) => {
        postAoe(`{"Name":"P11S 驳回否决 暗月环","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":22,"InnerRadius":8,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":7.5,"During":3}`);
        let pid= data.PartyIds[partnerMap[data.PartyIds.indexOf(data.myId)]];
        for (let i = 0; i < 4; i++) {
          if (data.PartyIds[i]==pid || data.PartyIds[i]==data.myId) {
            var col=data.triggerSetConfig.SafeAoeCol;
          }else{
            var col=data.triggerSetConfig.DangerAoeCol;
          }
          postAoe(`{"Name":"P11S 驳回否决 暗分摊","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[i]},"Radius":3,"Color":${col},"Delay":7.5,"During":3}`);
        }
      },
    },
    // P11S 球 Aoe
    {
      id: 'P11S 球 Aoe',
      type: 'StartsUsing',
      netRegex: { id: ['8215','8216']},
      run: (data, matches) => {
        postAoe(`{"Name":"球 Aoe","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":15,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":5.5}`);
      },
    },

    

    // 分歧否决 光直剑
    {
      id: 'P11S 分歧否决 光直剑',
      type: 'StartsUsing',
      netRegex: { id: '81EC'},
      run: (data, matches) => {
        var col=data.triggerSetConfig.DangerAoeCol%16777216;
        postAoe(`{"Name":"分歧否决 光直剑","AoeType":"Straight","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":46,"Width":16,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":8.2}`);
        postAoe(`{"Name":"分歧否决 光直剑扩散预测","AoeType":"Straight","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":46,"Width":26,"Rotation":0.0,"Color":${col},"Delay":0,"During":10.8}`);
        postAoe(`{"Name":"分歧否决 光直剑扩散","AoeType":"Straight","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":46,"Width":26,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":8.2,"During":2.6}`);
        
        if (data.调停) {
          var H1Light = data.调停点名[2] % 2 == 1;
          var index = data.调停点名[data.PartyIds.indexOf(data.myId)];
          var leftPart = (index == 0 || index == 2 || index == 5 || index == 7);
          if ((H1Light && leftPart) || (!H1Light && !leftPart)) {
            postAoe(`{"Name":"调停 分歧否决 光分摊H1","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[2]},"Radius":6,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":3.8}`);
            postAoe(`{"Name":"调停 分歧否决 光分摊H2","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[3]},"Radius":6,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":3.8}`);
          }
          else {
            postAoe(`{"Name":"调停 分歧否决 光分摊H1","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[2]},"Radius":6,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":3.8}`);
            postAoe(`{"Name":"调停 分歧否决 光分摊H2","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[3]},"Radius":6,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":3.8}`);
          }
        } else {
          var index = data.PartyIds.indexOf(data.myId);
          if (index == 0 || index == 2 || index == 4 || index == 6) {
            postAoe(`{"Name":"P11S 分歧否决 光分摊H1","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[2]},"Radius":6,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":8.2,"During":3.8}`);
            postAoe(`{"Name":"P11S 分歧否决 光分摊H2","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[3]},"Radius":6,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":8.2,"During":3.8}`);
          } else {
            postAoe(`{"Name":"P11S 分歧否决 光分摊H1","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[2]},"Radius":6,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":8.2,"During":3.8}`);
            postAoe(`{"Name":"P11S 分歧否决 光分摊H2","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[3]},"Radius":6,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":8.2,"During":3.8}`);
          }
        }

        
        
        
      },
    },
    // 分歧否决 暗直剑
    {
      id: 'P11S 分歧否决 暗直剑',
      type: 'StartsUsing',
      netRegex: { id: '81ED'},
      run: (data, matches) => {
        // postAoe(`{"Name":"分歧否决 暗直剑正","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":23,"Width":16,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":8.2}`);
        // postAoe(`{"Name":"分歧否决 暗直剑反","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":23,"Width":16,"Rotation":180.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":8.2}`);
        postAoe(`{"Name":"分歧否决 暗直剑","AoeType":"Straight","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":46,"Width":16,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":8.2}`);
        postAoe(`{"Name":"分歧否决 暗直剑辣翅","AoeType":"HotWing","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":46,"Width":16,"OuterWidth":20.0,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":8.2,"During":2.6}`)
        
        if (data.调停) {
          var pid = data.PartyIds[data.调停点名.indexOf(调停partnerMap[data.调停点名[data.PartyIds.indexOf(data.myId)]])];
          for (let i = 0; i < 8; i++) {
            if (data.调停点名[i] % 2 == 0) {
              if (data.PartyIds[i] == pid || data.PartyIds[i] == data.myId) {
                var col = data.triggerSetConfig.SafeAoeCol;
              } else {
                var col = data.triggerSetConfig.DangerAoeCol;
              }
              postAoe(`{"Name":"P11S 调停 维持否决 暗分摊","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[i]},"Radius":3,"Color":${col},"Delay":8.2,"During":3.8}`);
            }
          }
        } else {
          var pid = data.PartyIds[partnerMap[data.PartyIds.indexOf(data.myId)]];
          for (let i = 0; i < 4; i++) {
            if (data.PartyIds[i] == pid || data.PartyIds[i] == data.myId) {
              var col = data.triggerSetConfig.SafeAoeCol;
            } else {
              var col = data.triggerSetConfig.DangerAoeCol;
            }
            postAoe(`{"Name":"P11S 维持否决 暗分摊","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[i]},"Radius":3,"Color":${col},"Delay":8.2,"During":3.8}`);
          }
        }
      },
    },
    // 戒律小怪 光直剑 MT拉光
    {
      id: 'P11S 戒律小怪 光直剑 MT拉光',
      type: 'StartsUsing',
      netRegex: { id: '821D' },
      run: (data, matches) => {
        if (data.PartyIds.indexOf(data.myId)!==0) return;
        if (data.戒律小怪拉光) return;
        data.戒律小怪拉光=true;
        let x=parseFloat(matches.x);
        let y=parseFloat(matches.y);
        if(Math.hypot((x-88),(y-100))>22.5){
          var epos={"X":100-(x-100)/22.5*11,"Y":0,"Z":100-(y-100)/22.5*11}
        }else{
          var epos={"X":100+(x-100)/22.5*11,"Y":0,"Z":100+(y-100)/22.5*11}
        }
        postAoe(`{"Name":"戒律小怪 光直剑 MT拉光","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":${JSON.stringify(epos)},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":4}`);
        // tp(JSON.stringify(epos));
        postAoe(`{"Name":"戒律小怪 光直剑 MT拉光回位","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":{"X":88,"Y":0,"Z":100},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":4,"During":5}`);
        setTimeout(() => {
          // tp(`{"X":88,"Y":0,"Z":100}`);
        }, 4200);
      }
    },
    // 戒律小怪 光直剑
    {
      id: 'P11S 小怪分歧否决 光直剑',
      type: 'StartsUsing',
      netRegex: { id: '821D' },
      run: (data, matches) => {
        let delay=0;
        let dur =9.2;
        if (data.phase === 'letter') {
          delay=5;
          dur=4.2;
        }
        postAoe(`{"Name":"戒律小怪 光直剑扩散","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":46,"Width":26,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":9.2,"During":3.2}`);
        postAoe(`{"Name":"戒律小怪 光直剑","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":46,"Width":16,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":${delay},"During":${dur}}`);
      },
    },
    // 戒律小怪 暗直剑
    {
      id: 'P11S 小怪分歧否决 暗直剑',
      type: 'StartsUsing',
      netRegex: { id: '821E'},
      run: (data, matches) => {
        let delay=0;
        let dur =9.2;
        if (data.phase === 'letter') {
          delay=5;
          dur=4.2;
        }
        postAoe(`{"Name":"戒律小怪 暗直剑","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":46,"Width":16,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":${delay},"During":${dur}}`);
        postAoe(`{"Name":"戒律小怪 暗直剑辣翅","AoeType":"HotWing","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":92,"Width":16,"OuterWidth":20.0,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":9.2,"During":3.2}`)
        
      },
    },
    // 戒律BOSS 光直剑
    {
      id: 'P11S 戒律BOSS 光直剑',
      type: 'StartsUsing',
      netRegex: { id: '87B3'},
      run: (data, matches) => {
        var col=data.triggerSetConfig.DangerAoeCol%16777216;
        postAoe(`{"Name":"戒律BOSS 光直剑","AoeType":"Straight","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":46,"Width":16,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":9.8}`);
        postAoe(`{"Name":"戒律BOSS 光直剑扩散预测","AoeType":"Straight","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":46,"Width":26,"Rotation":0.0,"Color":${col},"Delay":0,"During":9.8}`);
        postAoe(`{"Name":"戒律BOSS 光直剑扩散","AoeType":"Straight","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":46,"Width":26,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":9.8,"During":3.6}`);
        
        let index = data.PartyIds.indexOf(data.myId);
        if (index == 0 || index == 2 || index == 4 || index == 6) {
          postAoe(`{"Name":"P11S 戒律BOSS 光分摊H1","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[2]},"Radius":6,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":9,"During":3.4}`);
          postAoe(`{"Name":"P11S 戒律BOSS 光分摊H2","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[3]},"Radius":6,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":9,"During":3.4}`);
        } else {
          postAoe(`{"Name":"P11S 戒律BOSS 光分摊H1","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[2]},"Radius":6,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":9,"During":3.4}`);
          postAoe(`{"Name":"P11S 戒律BOSS 光分摊H2","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[3]},"Radius":6,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":9,"During":3.4}`);
        }
      },
    },
    // 戒律BOSS 暗直剑
    {
      id: 'P11S 戒律BOSS 暗直剑',
      type: 'StartsUsing',
      netRegex: { id: '87B4'},
      run: (data, matches) => {
        postAoe(`{"Name":"戒律BOSS 暗直剑","AoeType":"Straight","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":46,"Width":16,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":9.8}`);
        postAoe(`{"Name":"戒律BOSS 暗直剑辣翅","AoeType":"HotWing","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":46,"Width":16,"OuterWidth":20.0,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":9.8,"During":2.6}`)
        let pid= data.PartyIds[partnerMap[data.PartyIds.indexOf(data.myId)]];
        for (let i = 0; i < 4; i++) {
          if (data.PartyIds[i]==pid || data.PartyIds[i]==data.myId) {
            var col=data.triggerSetConfig.SafeAoeCol;
          }else{
            var col=data.triggerSetConfig.DangerAoeCol;
          }
          postAoe(`{"Name":"P11S 戒律BOSS 暗分摊","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[i]},"Radius":3,"Color":${col},"Delay":9,"During":3.4}`);
        }
      },
    },
    // 踩塔
    {
      id: 'P11S 踩塔',
      type: 'Ability',
      netRegex: { id: '8225', capture: false },
      condition: (data) => data.phase === 'letter',
      suppressSeconds: 5,
      run: (data, matches) => {
        let index= data.PartyIds.indexOf(data.myId);
        if (index==0 || index==6) {
          postAoe(`{"Name":"踩塔MT组","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":91.87,"Y":0,"Z":91.87},"Radius":4,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":5}`)
        }
        if (index==1 || index==5) {
          postAoe(`{"Name":"踩塔ST组","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":108.13,"Y":0,"Z":108.13},"Radius":4,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":5}`)
        }
        if (index==2 || index==4) {
          postAoe(`{"Name":"踩塔H1组","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":91.87,"Y":0,"Z":108.13},"Radius":4,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":5}`)
        }
        if (index==3 || index==4) {
          postAoe(`{"Name":"踩塔H2组","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":108.13,"Y":0,"Z":91.87},"Radius":4,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":5}`)
        }
        
      },
    },

    // 调停开始
    {
      id: 'P11S 调停开始',
      type: 'StartsUsing',
      netRegex: { id: '81FE'},
      run: (data, matches) => {
       data.调停=true;
      },
    },
    // 调停开始
    {
      id: 'P11S 调停结束',
      type: 'StartsUsing',
      netRegex: { id: '8202'},
      run: (data, matches) => {
       data.调停=false;
      },
    },
    // 调停起跑位置
    {
      id: 'P11S 调停起跑位置',
      type: 'GainsEffect',
      // DE1 = Light's Accord
      // DE2 = Dark's Accord
      // DE3 = Light's Discord
      // DE4 = Dark's Discord
      netRegex: { effectId: ['DE1', 'DE2', 'DE3', 'DE4'] },
      run: (data, matches) => {
        if (parseInt(matches.targetId,16)!=data.myId ) return;
        if (data.光暗连线处理) return;
        data.光暗连线处理=true;

        const isLight = matches.effectId === 'DE1' || matches.effectId === 'DE3';
        if(isLight)
        {
          if (data.role=='dps') {
            postAoe(`{"Name":"调停 光DPS暗TN 起跑位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":114,"Y":0,"Z":100},"Radius":1,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":10}`)
            postAoe(`{"Name":"调停 光DPS暗TN 起跑位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":{"X":114,"Y":0,"Z":100},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":10}`)
            tp(`{"X":114,"Y":0,"Z":100}`);
          }else{
            postAoe(`{"Name":"调停 光TN暗DPS 起跑位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":86,"Y":0,"Z":100},"Radius":1,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":10}`)
            postAoe(`{"Name":"调停 光TN暗DPS 起跑位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":{"X":86,"Y":0,"Z":100},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":10}`)
            tp(`{"X":86,"Y":0,"Z":100}`);
          }
        }else{
          if (data.role=='dps') {
            postAoe(`{"Name":"调停 光TN暗DPS 起跑位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":86,"Y":0,"Z":100},"Radius":1,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":10}`)
            postAoe(`{"Name":"调停 光TN暗DPS 起跑位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":{"X":86,"Y":0,"Z":100},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":10}`)
            tp(`{"X":86,"Y":0,"Z":100}`);
          }else{
            postAoe(`{"Name":"调停 光DPS暗TN 起跑位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":114,"Y":0,"Z":100},"Radius":1,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":10}`)
            postAoe(`{"Name":"调停 光DPS暗TN 起跑位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":{"X":114,"Y":0,"Z":100},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":10}`)
            tp(`{"X":114,"Y":0,"Z":100}`);
          }
        }
      },
    },
    // 调停buff记录
    {
      id: 'P11S 调停buff记录',
      type: 'GainsEffect',
      // DE1 = Light's Accord
      // DE2 = Dark's Accord
      // DE3 = Light's Discord
      // DE4 = Dark's Discord
      netRegex: { effectId: ['DE1', 'DE2', 'DE3', 'DE4'] },
      run: (data, matches) => {
        const isLight = matches.effectId === 'DE1' || matches.effectId === 'DE3';

        var index= data.PartyIds.indexOf(parseInt(matches.targetId,16));
        if (data.调停buff记录[index]) return;
        data.调停buff记录[index]=true;

        
        if(isLight)
        {
          data.调停点名[index]+=1;
        }
      },
    },
    // 调停连线记录
    {
      id: 'P11S 调停连线记录',
      type: 'Tether',
      // 00EC = light far tether (correct)
      // 00ED = light far tether (too close)
      // 00EE = dark far tether (correct)
      // 00EF = dark far tether (too close)
      // 00F0 = near tether (correct)
      // 00F1 = near tether (too far)
      netRegex: { id: ['00EC', '00ED', '00EE', '00EF', '00F0', '00F1'] },
      run: (data, matches) => {

        // 1 光
        // 2 近
        // 4 TN

        // 0 暗远Dps
        // 1 光远Dps
        // 2 暗近Dps
        // 3 光近Dps
        // 4 暗远TN
        // 5 光远TN
        // 6 暗近TN
        // 7 光近TN

        
        const isNear = matches.id === '00F0' || matches.id === '00F1';


        var indexS= data.PartyIds.indexOf(parseInt(matches.sourceId,16));
        var indexT= data.PartyIds.indexOf(parseInt(matches.targetId,16));
        
        if (!data.调停连线记录[indexS]) {
          data.调停连线记录[indexS]=true;
          if(isNear)
          {
            data.调停点名[indexS]+=2;
          }
        }
        if (!data.调停连线记录[indexT]) {
          data.调停连线记录[indexT]=true;
          if(isNear)
          {
            data.调停点名[indexT]+=2;
          }
        }
      },
    },


    
    
  ],
});
