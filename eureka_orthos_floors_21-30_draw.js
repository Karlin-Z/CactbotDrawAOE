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
  id: 'EurekaOrthosFloors21_30_draw',
  zoneId: ZoneId.EurekaOrthosFloors21_30,
  triggers: [
    { id: '冷酷凝视',
      type: 'StartsUsing',
      netRegex: { id: '7EAB'},
      // Don't clean up when the buff is lost, as that happens after taking a tower.
      run: async (data, matches) => {
        postAoe(`{"Name":"冷酷凝视","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":12,"Angle":90,"Rotation":0,"Color":1073742079,"Delay":0,"During":3.5}`)
      },
    },
    { id: '重击',
      type: 'StartsUsing',
      netRegex: { id: '7EA5'},
      // Don't clean up when the buff is lost, as that happens after taking a tower.
      run: async (data, matches) => {
        postAoe(`{"Name":"冷酷凝视","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":40,"Angle":60,"Rotation":0,"Color":1073742079,"Delay":0,"During":3.5}`)
      },
    },
    { id: '尾镰',
      type: 'StartsUsing',
      netRegex: { id: '7EAC'},
      // Don't clean up when the buff is lost, as that happens after taking a tower.
      run: async (data, matches) => {
        postAoe(`{"Name":"Circle Example","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":6,"Color":1073807359,"Delay":0,"During":3.5}`)
      },
    },
    
  ],
  
});
