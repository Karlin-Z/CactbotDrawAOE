



// TODO: Callout safe quadrant/half for Venom Pool with Crystals
const directions = ['NW', 'NE', 'SE', 'SW'];
const convertCoordinatesToDirection = (x, y) => {
  if (x > 100)
    return y < 100 ? 'NE' : 'SE';
  return y < 100 ? 'NW' : 'SW';
};
const unsafeDirectionPos = (x, y) => {
  if (x > 100)
    return y < 100 ? '{"X":107.5,"Y":-300,"Z":85}' : '{"X":107.5,"Y":-300,"Z":100}';
  return y < 100 ? '{"X":92.5,"Y":-300,"Z":85}' : '{"X":92.5,"Y":-300,"Z":100}';
};
const posTo8part=(x,y)=>
{
  let posX=x-100;
  let posY=100-y;
  return Math.floor((Math.atan2(posX,posY)/Math.PI+2)%2*4);
}
const aoeport = 9588;  //aoe监听的端口
function postAoe(data) {
    fetch(`http://127.0.0.1:${aoeport}/DrawAoe`, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: data
    });
}
const sendCommand=(command)=>{
  callOverlayHandler({ call: 'PostNamazu', c: 'command', p:`${command}`});
}
Options.Triggers.push({
  zoneId: ZoneId.AbyssosTheFifthCircleSavage,
  initData: () => {
    return {
      RubyParse:0,
      红宝石之光4方向:'',
      红宝石之光4Dic:{'NE':0,'SE':0,'SW':0,'NW':0},
      红宝石之光6Dic:{},
    };
  },
  triggers: [
   
    {
      id: 'P5S 红宝石之光计数器',
      type: 'StartsUsing',
      netRegex: { id: '76F3'},
      suppressSeconds: 1,
      run: (data, matches) => {
        data.RubyParse++;
      },
    },
    {
      id: 'P5S 红宝石之光1',
      type: 'Ability',
      netRegex: { id: '76FE'},
      // disabled: true,
      condition: (data, matches) => data.RubyParse===1,
      run: (data, matches) => {
        
        let posX=parseFloat(matches.x);
        let posY=parseFloat(matches.y);
        if (Math.abs(Math.abs(posX-100)-Math.abs(posY-100))<0.5) {
          //26s 范围待定
          // postAoe('{"AoeType":1,"PostionType":1,"ActorId":0x'+matches.sourceId+',"OuterRadius":15,"Color":838926335,"Delay":0.0,"During":22}');
          postAoe(`{"AoeType":1,"PostionType":3,"Postion":{"X":${posX},"Y":-300,"Z":${posY}},"OuterRadius":12,"Color":1291845887,"Delay":0.0,"During":22}`);
        }
        else{
          postAoe(`{"AoeType":3,"PostionType":3,"Postion":${unsafeDirectionPos(posX,posY)},"TrackMode":1,"Rotation":0.0,"Length":15,"Width":15,"Color":1677787135,"Delay":0.0,"During":17.5}`);
        }
        
        
      },
    },
    {
      id: 'P5S 红宝石之光2',
      type: 'StartsUsing',
      netRegex: { id: '79FE'},
      // disabled: true,
      condition: (data, matches) => data.RubyParse===2,
      run: (data, matches) => {
        let duPosX=200-parseFloat(matches.x);
        let duPosY=200-parseFloat(matches.y);
        postAoe(`{"AoeType":1,"PostionType":3,"Postion":{"X":${duPosX},"Y":-300,"Z":${duPosY}},"OuterRadius":12,"Color":1291845887,"Delay":0.0,"During":22}`);
        let r8=posTo8part(parseFloat(matches.x),parseFloat(matches.y));
        let rr=45;
        if (r8===2 || r8===7) {
          rr=-135;
        }
        if (r8===0 || r8===5) {
          rr=135;
        }
        if (r8===1 || r8===4) {
          rr=-45;
        }
        postAoe(`{"AoeType":3,"PostionType":3,"Postion":{"X":100,"Y":-300,"Z":100},"TrackMode":1,"Rotation":${rr},"Length":30,"Width":42,"Color":1291845887,"Delay":9,"During":3}`);
      },
    },
    {
      id: 'P5S 红宝石之光3',
      type: 'StartsUsing',
      netRegex: { id: '79FF'},
      // disabled: true,
      run: (data, matches) => {
        postAoe(`{"AoeType":3,"PostionType":3,"Postion":${unsafeDirectionPos(parseFloat(matches.x),parseFloat(matches.y))},"TrackMode":1,"Rotation":0.0,"Length":15,"Width":15,"Color":1677787135,"Delay":6.2,"During":2.5}`);
        
      },
    },
    {
      id: 'P5S 红宝石之光4 毒圈',
      type: 'NetworkCancelAbility',
      netRegex: { id: '79FE'},
      condition: (data, matches) => data.RubyParse===4,
      run: async (data, matches) => {
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let posX=result.combatants[0].PosX;
        let posY=result.combatants[0].PosY;
        // postAoe('{"AoeType":1,"PostionType":1,"ActorId":0x'+matches.sourceId+',"OuterRadius":12,"Color":838926335,"Delay":0.0,"During":26}');
        postAoe(`{"AoeType":1,"PostionType":3,"Postion":{"X":${posX},"Y":-300,"Z":${posY}},"OuterRadius":12,"Color":1291845887,"Delay":0.0,"During":22}`);
      },
    },
    {
      id: 'P5S 红宝石之光4方向',
      type: 'StartsUsing',
      netRegex: { id: '76FE'},
      condition: (data, matches) => data.RubyParse===4,
      run: async (data, matches) => {
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        
        let posX=result.combatants[0].PosX;
        let posY=result.combatants[0].PosY;
        let posXr=posX-100;
        let posYr=posY-100;
        if (Math.sqrt(posXr*posXr+posYr*posYr)<10) {
           let r8= posTo8part(posX,posY);
           if (r8===0||r8===1||r8===4||r8===5) {
            data.红宝石之光4方向='NE';
           }else{
            data.红宝石之光4方向='NW';
           }
        }
      },
    },
    {
      id: 'P5S 红宝石之光4计算',
      type: 'StartsUsing',
      netRegex: { id: '76FE'},
      delaySeconds:0.2,
      condition: (data, matches) => data.RubyParse===4,
      run: async (data, matches) => {
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let posX=result.combatants[0].PosX;
        let posY=result.combatants[0].PosY;
        console.log(`${matches.sourceId}|${matches.x}|${matches.y}::${result.combatants[0].ID.toString(16)}|${posX}|${posY}`);
        let posXr=posX-100;
        let posYr=posY-100;
        if (Math.sqrt(posXr*posXr+posYr*posYr)>10) {
           let r8= posTo8part(posX,posY);
           if (data.红宝石之光4方向==='NE') {
            if (r8===0||r8===7||r8===6||r8===5) {
              data.红宝石之光4Dic['NW']++;
            } else {
              data.红宝石之光4Dic['SE']++;
            }
           } else {
            if (r8===7||r8===0||r8===1||r8===2) {
              data.红宝石之光4Dic['NE']++;
            } else {
              data.红宝石之光4Dic['SW']++;
            }
           }
           
        }
      },
    },
    {
      id: 'P5S 红宝石之光4反射',
      type: 'StartsUsing',
      netRegex: { id: '76FE'},
      delaySeconds:0.5,
      condition: (data, matches) => data.RubyParse===4,
      run: async (data, matches) => {
        if (data.红宝石之光4Dic['SW']===2) {
          postAoe(`{"AoeType":3,"PostionType":3,"Postion":{"X":100,"Y":-300,"Z":100},"TrackMode":1,"Rotation":45,"Length":30,"Width":40,"Color":1291845887,"Delay":0,"During":17}`);
        }
        if (data.红宝石之光4Dic['NW']===2) {
          postAoe(`{"AoeType":3,"PostionType":3,"Postion":{"X":100,"Y":-300,"Z":100},"TrackMode":1,"Rotation":135,"Length":30,"Width":40,"Color":1291845887,"Delay":0,"During":17}`);
        }
        if (data.红宝石之光4Dic['NE']===2) {
          postAoe(`{"AoeType":3,"PostionType":3,"Postion":{"X":100,"Y":-300,"Z":100},"TrackMode":1,"Rotation":-135,"Length":30,"Width":40,"Color":1291845887,"Delay":0,"During":17}`);
        }
        if (data.红宝石之光4Dic['SE']===2) {
          postAoe(`{"AoeType":3,"PostionType":3,"Postion":{"X":100,"Y":-300,"Z":100},"TrackMode":1,"Rotation":-45,"Length":30,"Width":40,"Color":1291845887,"Delay":0,"During":17}`);
        }
      },
    },
    {
      id: 'P5S 红宝石之光5',
      type: 'StartsUsing',
      netRegex: { id: '76FE'},
      // disabled: true,
      condition: (data, matches) => data.RubyParse===5,
      run: async (data, matches) => {
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let posX=result.combatants[0].PosX;
        let posY=result.combatants[0].PosY;
        if (Math.abs(posX-100)<=1 || Math.abs(posY-100)<=1) {
          postAoe(`{"AoeType":3,"PostionType":3,"Postion":${unsafeDirectionPos(posX,posY)},"TrackMode":1,"Rotation":0.0,"Length":15,"Width":15,"Color":1677787135,"Delay":0,"During":17.5}`);
        } else {
          postAoe(`{"AoeType":1,"PostionType":3,"Postion":{"X":${matches.x},"Y":-300,"Z":${matches.y}},"OuterRadius":12,"Color":1291845887,"Delay":0.0,"During":22}`);
          // postAoe('{"AoeType":1,"PostionType":1,"ActorId":0x'+matches.sourceId+',"OuterRadius":12,"Color":838926335,"Delay":0.0,"During":22}');
        }
        
      },
    },
    {
      id: 'P5S 红宝石之光6',
      type: 'StartsUsing',
      netRegex: { id: '76FE'},
      // disabled: true,
      condition: (data, matches) => data.RubyParse===6,
      run: async (data, matches) => {
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let posX=result.combatants[0].PosX;
        let posY=result.combatants[0].PosY;
        data.红宝石之光6Dic[Math.floor(posTo8part(posX,posY)/2)]++;
        if (data.红宝石之光6Dic[Math.floor(posTo8part(posX,posY)/2)]==3) {
          postAoe(`{"AoeType":3,"PostionType":3,"Postion":${unsafeDirectionPos(posX,posY)},"TrackMode":1,"Rotation":0.0,"Length":15,"Width":15,"Color":1677787135,"Delay":0.0,"During":17.5}`);
          postAoe(`{"AoeType":3,"PostionType":3,"Postion":${unsafeDirectionPos(200-posX,posY)},"TrackMode":1,"Rotation":0.0,"Length":15,"Width":15,"Color":1677787135,"Delay":0.0,"During":17.5}`);
          postAoe(`{"AoeType":3,"PostionType":3,"Postion":${unsafeDirectionPos(posX,200-posY)},"TrackMode":1,"Rotation":0.0,"Length":15,"Width":15,"Color":1677787135,"Delay":0.0,"During":17.5}`);
        }
      },
    },
    {
      id: 'P5S 红宝石之光6 毒圈',
      type: 'NetworkCancelAbility',
      netRegex: { id: '79FE'},
      condition: (data, matches) => data.RubyParse===6,
      run: async (data, matches) => {
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let posX=result.combatants[0].PosX;
        let posY=result.combatants[0].PosY;
        // postAoe('{"AoeType":1,"PostionType":1,"ActorId":0x'+matches.sourceId+',"OuterRadius":12,"Color":838926335,"Delay":0.0,"During":26}');
        postAoe(`{"AoeType":1,"PostionType":3,"Postion":{"X":${posX},"Y":-300,"Z":${posY}},"OuterRadius":12,"Color":1291845887,"Delay":0.0,"During":22}`);
      },
    },
    {
      //分散分摊三连击
      id: 'P5S 分散分摊三连击',
      type: 'StartsUsing',
      netRegex: { id: '771[67]'},
      // disabled: true,
      run:async (data, matches)=>{
        if (matches.id === '7716'){
          data.party.partyIds_.forEach( pids => {
            postAoe(`{"AoeType":1,"PostionType":1,"ActorId":0x${pids},"OuterRadius":5,"Color":1677787135,"Delay":0,"During":9}`);
          }); 
          data.party.healerNames.forEach(name => {
            postAoe(`{"AoeType":1,"PostionType":2,"ActorName":"${name}","OuterRadius":12,"Color":1677787135,"Delay":5,"During":6}`);
          });
        }
        else{
          data.party.healerNames.forEach(name => {
            postAoe(`{"AoeType":1,"PostionType":2,"ActorName":"${name}","OuterRadius":5,"Color":1677787135,"Delay":5,"During":9}`);
          });
          data.party.partyIds_.forEach( pids => {
            postAoe(`{"AoeType":1,"PostionType":1,"ActorId":0x${pids},"OuterRadius":5,"Color":1677787135,"Delay":12,"During":6}`);
          }); 
        }

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
            postAoe(`{"AoeType":1,"PostionType":3,"Postion":{"X":${comb.PosX},"Y":${comb.PosZ},"Z":${comb.PosY}},"OuterRadius":5,"Color":1677787135,"Delay":12,"During":3}`);
            }
        });
        
      },
    },
    {
      id: 'P5S 双重冲击',
      type: 'StartsUsing',
      netRegex: { id: '771B'},
      // disabled: true,
      run: (data, matches) => {
        postAoe(`{"AoeType":3,"PostionType":1,"ActorId":0x${matches.sourceId},"TrackMode":1,"Rotation":0.0,"Length":30,"Width":44,"Color":838926335,"Delay":0.0,"During":6}`);
      },
    },
    {
      id: 'P5S 双重冲击防击退',
      type: 'StartsUsing',
      netRegex: { id: '771B', capture: false },
      // disabled: true,
      delaySeconds: 4,
      run: (data, matches) => {
        sendCommand('/ac 亲疏自行');
        sendCommand('/ac 沉稳咏唱');
      },
    },
    {
      id: 'P5S 八连跳',
      type: 'StartsUsing',
      netRegex: { id: '7A03'},
      // disabled: true,
      run: (data, matches) => {
          // postAoe(`{"AoeType":1,"PostionType":1,"ActorId":0x${matches.sourceId},"OuterRadius":12,"Color":838926335,"Delay":0.0,"During":2}`);
          postAoe(`{"AoeType":1,"PostionType":3,"Postion":{"X":${matches.x},"Y":${matches.z},"Z":${matches.y}},"OuterRadius":12,"Color":1291845887,"Delay":0.0,"During":1.5}`);
        
      },
    },
    {
      id: 'P5S 狂怒爪击',
      type: 'StartsUsing',
      netRegex: { id: '76FA'},
      run: (data, matches) => {
        postAoe(`{"AoeType":3,"PostionType":1,"ActorId":0x${matches.sourceId},"TrackMode":1,"Rotation":0.0,"Length":40,"Width":40,"Color":838926335,"Delay":0.0,"During":4.7}`);
      },
    },
    {
      id: 'P5S 灼热射线',
      type: 'StartsUsing',
      netRegex: { id: '76[DF]7', },
      run: async (data, matches) => {
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let posX=result.combatants[0].PosX;
        let posY=result.combatants[0].PosY;
        let r8= posTo8part(posX,posY);
        postAoe(`{"AoeType":3,"PostionType":3,"Postion":{"X":100,"Y":-300,"Z":100},"TrackMode":1,"Rotation":${Math.floor(r8/2)*90-135},"Length":30,"Width":42,"Color":1291845887,"Delay":0.0,"During":4.7}`);
      },
    },
    {
      //
      id: 'P5S 尾爪连击',
      type: 'StartsUsing',
      netRegex: { id: '7712'},
      // disabled: true,
      run: (data, matches) => {
        postAoe(`{"AoeType":3,"PostionType":1,"ActorId":0x${matches.sourceId},"TrackMode":1,"Rotation":180,"Length":40,"Width":40,"Color":1291845887,"Delay":0.0,"During":5.2}`);
        postAoe(`{"AoeType":3,"PostionType":1,"ActorId":0x${matches.sourceId},"TrackMode":1,"Rotation":0,"Length":40,"Width":40,"Color":1291845887,"Delay":5.2,"During":6.8}`);
      
      },
    },
    
    {
      id: 'P5S 爪尾连击',
      type: 'StartsUsing',
      // disabled: true,
      netRegex: { id: '770E'},
      run: (data, matches) => {
        postAoe(`{"AoeType":3,"PostionType":1,"ActorId":0x${matches.sourceId},"TrackMode":1,"Rotation":0.0,"Length":40,"Width":40,"Color":1291845887,"Delay":0,"During":8.4}`);
        postAoe(`{"AoeType":3,"PostionType":1,"ActorId":0x${matches.sourceId},"TrackMode":1,"Rotation":180.0,"Length":40,"Width":40,"Color":1291845887,"Delay":8.4,"During":3.6}`);
      
      },
    },
    
  ],
  
});
