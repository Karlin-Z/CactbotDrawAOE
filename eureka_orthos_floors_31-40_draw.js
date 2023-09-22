let aoeport = 9588; //aoe监听的端口
function postAoe(data) {
  
    fetch(`http://127.0.0.1:${aoeport}/Add`, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: data
    });
}


Options.Triggers.push({
  id: 'EurekaOrthosFloors31_40_draw',
  zoneId: ZoneId.EurekaOrthosFloors31_40,
  triggers: [
    {
      id: 'EO 31-40 Twintania Clone Twister',
      type: 'StartsUsing',
      netRegex: { id: '7AEC'},
      delaySeconds: (_data, matches) => parseFloat(matches.castTime) - 1,
      alertText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Twisters',
          de: 'Wirbelstürme',
          fr: 'Tornades',
          ja: '大竜巻',
          cn: '旋风旋风',
          ko: '회오리',
        },
      },
    },
    {
      id: 'EO 31-40 俯冲',
      type: 'StartsUsing',
      netRegex: { id: '7AEF',  },
      run: async (data, matches) => {
        postAoe(`{"Name":"俯冲","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":50,"Width":15,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":5}`);
      },
    },
    { id: '雷电咆哮',
      type: 'StartsUsing',
      netRegex: { id: '7EBC'},
      run: async (data, matches) => {
        postAoe(`{"Name":"雷电咆哮","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":40,"InnerRadius":9.0,"Color":1073807359,"Delay":0,"During":4}`);
      },
    },
    { id: '寒冰咆哮',
      type: 'StartsUsing',
      netRegex: { id: '7EBB'},
      run: async (data, matches) => {
        postAoe(`{"Name":"寒冰咆哮","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":9,"Color":1073807359,"Delay":0,"During":4}`);
      },
    },
    { id: '前方剑闪',
      type: 'StartsUsing',
      netRegex: { id: '8193'},
      run: async (data, matches) => {
        postAoe(`{"Name":"Sector Example","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":50,"Angle":180,"Rotation":0,"Color":1073807359,"Delay":0,"During":4.5}`);
      },
    },
    { id: '剑风',
      type: 'StartsUsing',
      netRegex: { id: '7EB4'},
      run: async (data, matches) => {
        postAoe(`{"Name":"寒冰咆哮","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":10,"Color":1073807359,"Delay":0,"During":4.5}`);
      },
    },
    { id: '回转',
      type: 'StartsUsing',
      netRegex: { id: '7EB8'},
      run: async (data, matches) => {
        postAoe(`{"Name":"寒冰咆哮","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":12,"Color":1073807359,"Delay":0,"During":4}`);
      },
    },
    { id: '横扫',
    type: 'StartsUsing',
    netRegex: { id: '7EB7'},
    run: async (data, matches) => {
      postAoe(`{"Name":"Sector Example","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":12,"Angle":120,"Rotation":0,"Color":1073807359,"Delay":0,"During":3}`);
    },
  },
    
  ],
  
});
