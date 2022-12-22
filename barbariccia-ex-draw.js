const aoeport = 9588;  //aoe监听的端口

function postAoe(command, data) {
    fetch(`http://127.0.0.1:${aoeport}/${command}`, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: data
    });
}

Options.Triggers.push({
  zoneId: ZoneId.StormsCrownExtreme,
  initData: () => {
    return {
      boldBoulderTargets: [],
      hairFlayUpbraidTargets: [],
    };
  },
  
  triggers: [
    
    {
      // Savage Barbery has 3 casts that all start at the same time.
      // 5.7 duration: 7464, 7465, 7466, 7489, 748B, 7573 (all actual cast bar, unknown how to differentiate)
      // 6.7 duration: 7574 (donut), 757A (line)
      // 8.8 duration: 7575 (out, paired with donut), 757B (out, paired with line)
      id: 'BarbaricciaEx 野蛮突袭月环 DrawAoe',
      type: 'StartsUsing',
      netRegex: { id: '7574'},
      run: (data, matches) => {
          postAoe('DrawAoe', '{"AoeType":2,"PostionType":1,"ActorId":0x'+matches.sourceId+',"OuterRadius":20,"InnerRadius":6,"Color":1291911167,"Delay":0.0,"During":7.0}');
           
            
        },
    },
    {
      id: 'BarbaricciaEx 野蛮突袭直线 DrawAoe',
      type: 'StartsUsing',
      netRegex: { id: '757A'},
      run: (data, matches) => {
          postAoe('DrawAoe', '{"AoeType":3,"PostionType":1,"ActorId":0x'+matches.sourceId+',"TrackMode":1,"Rotation":0.0,"Length":20,"Width":12,"Color":1291911167,"Delay":0.0,"During":7.0}');
          postAoe('DrawAoe', '{"AoeType":3,"PostionType":1,"ActorId":0x'+matches.sourceId+',"TrackMode":1,"Rotation":180,"Length":20,"Width":12,"Color":1291911167,"Delay":0.0,"During":7.0}');
            
        },
    },
    {
      id: 'BarbaricciaEx Savage 野蛮突袭大圈 DrawAoe',
      type: 'StartsUsing',
      netRegex: { id: ['7575', '757B']},
      run: (data, matches) => {
            postAoe('DrawAoe', '{"AoeType":1,"PostionType":1,"ActorId":0x'+matches.sourceId+',"OuterRadius":20,"Color":1291911167,"Delay":0.0,"During":9.0}');
        },
    },
    {
      // Hair Raid has 2 casts that start at the same time, then a slight delay for stack/spread.
      // 5.7 duration: 757C (wall), 757E (donut)
      // 7.7 duration: 757D (paired with wall), 757F (paired with donut)
      //
      // ~2.2s delay, and then:
      // 7.7 duration (Hair Spray): 75A6
      // 7.7 duration (Deadly Twist): 75A7
      id: 'BarbaricciaEx 咒法突袭月环 DrawAoe',
      type: 'StartsUsing',
      netRegex: { id: '757F'},
      run: (data, matches) => {
            postAoe('DrawAoe', '{"AoeType":2,"PostionType":1,"ActorId":0x'+matches.sourceId+',"OuterRadius":20,"InnerRadius":6,"Color":1291911167,"Delay":0.0,"During":8.0}');
        },
    },
    {
      id: 'BarbaricciaEx 咒法突袭扇形 DrawAoe',
      type: 'StartsUsing',
      netRegex: { id: '757D'},
      run: (data, matches) => {
            postAoe('DrawAoe', '{"AoeType":4,"PostionType":1,"ActorId":0x'+matches.sourceId+',"TrackMode":1,"Rotation":0.0,"OuterRadius":40,"SectorAngle":120.0,"Color":1291911167,"Delay":0.0,"During":9.0}');
      },
    },
    
    //万变水波
    {
      id: 'BarbaricciaEx 万变水波 DrawAoe',
      type: 'StartsUsing',
      netRegex: { id: '7580'},
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
            postAoe('DrawAoe', '{"AoeType":4,"PostionType":1,"ActorId":0x'+matches.sourceId+',"TrackMode":2,"TrackId":'+comb.ID+',"OuterRadius":20,"SectorAngle":45,"Color":1291911167,"Delay":4.0,"During":3.0}');
          }
        });
      },
    },

    //冲拳测试
    {
      id: '冲拳范围',
      type: 'ObjectSpawn',
      netRegex: /ChatLog 00:0:106:(?<Id>[^:]{8}):[^:]*:.{4}:.{4}:00001E46:/,
      run: (data, matches) => {
        postAoe('DrawAoe', '{"AoeType":3,"PostionType":1,"ActorId":0x'+matches.Id+',"TrackMode":1,"Rotation":0.0,"Length":40,"Width":4,"Color":838926335,"Delay":0.0,"During":2}');
      },
      
    },
  ],
  
});
