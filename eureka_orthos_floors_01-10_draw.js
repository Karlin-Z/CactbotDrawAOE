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
  id: 'EurekaOrthosFloors1_10_draw',
  zoneId: ZoneId.EurekaOrthosFloors1_10,
  triggers: [
    { id: '炸弹怪',
      type: 'StartsUsing',
      netRegex: { id: '7E7D'},
      // Don't clean up when the buff is lost, as that happens after taking a tower.
      run: async (data, matches) => {
        postAoe(`{"Name":"Circle Example","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":6,"Color":1073807359,"Delay":0,"During":3.5}`)
      },
    },
    { id: 'boss炸弹怪',
      type: 'StartsUsing',
      netRegex: { id: ['7AF6','7FBC']},
      // Don't clean up when the buff is lost, as that happens after taking a tower.
      run: async (data, matches) => {
        var t= parseFloat(matches.castTime);
        postAoe(`{"Name":"Circle Example","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":10,"Color":1073807359,"Delay":0,"During":t}`)
      },
    },
  ],
  
});
