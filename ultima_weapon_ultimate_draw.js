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
const actionport = 9909;  //技能监听端口
function sendAction(id, target, delay, force) {
  fetch(`http://127.0.0.1:${actionport}/DoAction`, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: `{"Id":${id},"Target":0x${target},"Delay":${delay},"Force":${force}}`
  });
}
function target(id) {
  fetch(`http://127.0.0.1:${actionport}/Target`, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: `{"Type":0,"Id":${id},"Name":"欧米茄"}`
  });
}
function pluginSetting(cmd) {
  fetch(`http://127.0.0.1:${actionport}/Setting`, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: `${cmd}`
  });
}
const sendMark = (text) => {
  callOverlayHandler({ call: 'PostNamazu', c: 'mark', p: JSON.stringify(text) });
}
function PostNamazuMarkClear() {
  callOverlayHandler({
    call: "PostNamazu",
    c: 'command',
    p: '/mk clear <1>'
  });
  callOverlayHandler({
    call: "PostNamazu",
    c: 'command',
    p: '/mk clear <2>'
  });
  callOverlayHandler({
    call: "PostNamazu",
    c: 'command',
    p: '/mk clear <3>'
  });
  callOverlayHandler({
    call: "PostNamazu",
    c: 'command',
    p: '/mk clear <4>'
  });
  callOverlayHandler({
    call: "PostNamazu",
    c: 'command',
    p: '/mk clear <5>'
  });
  callOverlayHandler({
    call: "PostNamazu",
    c: 'command',
    p: '/mk clear <6>'
  });
  callOverlayHandler({
    call: "PostNamazu",
    c: 'command',
    p: '/mk clear <7>'
  });
  callOverlayHandler({
    call: "PostNamazu",
    c: 'command',
    p: '/mk clear <8>'
  });
}
const RotatePointFromCentre = (point, centre, angle) => {
  let rot=(1-(Math.atan2(point.x-centre.x,point.y-centre.y)/Math.PI))%2*180;
  let dis=Math.sqrt(Math.pow(point.x - centre.x, 2) + Math.pow((point.y - centre.y), 2));
  var end=new Object();
  end.x = centre.x+Math.sin((rot + angle) / 180 * Math.PI) * dis;
  end.y = centre.y-Math.cos((rot + angle) / 180 * Math.PI) * dis; 
  return end;
}


// Note: without extra network data that is not exposed, it seems impossible to know where Titan
// looks briefly before jumping for Geocrush. A getCombatants trigger on NameToggle 00 was
// extremely inaccurate and so that is likely too late to know.
const centerX = 100;
const centerY = 100;

// Ultima Weapon Ultimate
Options.Triggers.push({
  id: 'TheWeaponsRefrainUltimateDraw',
  zoneId: ZoneId.TheWeaponsRefrainUltimate,
  config: [
    // Yes yes, a textarea would be nice here to put everything on separate lines,
    // but OverlayPlugin does not seem to support delivering the enter key and
    // so there's no way to have one box with names on separate lines.  Sorry!
    /* eslint-disable max-len */
    {
      id: "UWU_P3_Marker",
      name: { en: "三连桶标记" },
      type: "checkbox",
      default: false,
    },
  ],
  initData: () => {
    return {
      combatantData: [],
      
      bossId: {},
      thermalLow: {},
      beyondLimits: new Set(),
      slipstreamCount: 0,
      nailAdds: [],
      nailDeaths: {},
      nailDeathOrder: [],
      ifritUntargetableCount: 0,
      titanGaols: [],
      titanBury: [],
      ifritRadiantPlumeLocations: [],
      possibleIfritIDs: [],

      phase: 'garuda',
      风神觉醒: false,
      火神觉醒: false,
      土神觉醒: false,
      螺旋气流计数:0,
      光辉炎柱安全区:[1,1,1,1],
    };
  },
  timelineTriggers: [
    
  ],
  triggers: [

    { id: 'UWU 分P',
      type: 'Ability',
      // 2B53 = Slipstream
      // 2B5F = Crimson Cyclone
      // 2CFD = Geocrush
      // 2CF5 = Intermission
      // 2B87 = Tank Purge
      // 2D4C = Ultimate Annihilation
      // 2D4D = Ultimate Suppression
      netRegex: { id: ['2B53', '2B5F', '2CFD', '2CF5', '2B87', '2D4C', '2D4D','2CD4','2B8B'] },
      run: (data, matches) => {
        if (data.phase === 'garuda' && matches.id === '2B53') {
          data.bossId.garuda = matches.sourceId;
        } else if (data.phase === 'garuda' && matches.id === '2B5F') {
          data.phase = 'ifrit';
          data.bossId.ifrit = matches.sourceId;
        } else if (data.phase === 'ifrit' && matches.id === '2CFD') {
          data.phase = 'titan';
          data.bossId.titan = matches.sourceId;
        } else if (data.phase === 'titan' && matches.id === '2CF5') {
          data.phase = 'intermission';
        } else if (data.phase === 'intermission' && matches.id === '2B87') {
          data.phase = 'predation';
          data.bossId.ultima = matches.sourceId;
        }

        if (matches.id === '2B8B') {
          data.bossId.ultima = matches.sourceId;
        }
        if (matches.id === '2CD4') {
          data.phase = '1.5运';
        }
        if (matches.id === '2D4C') {
          data.phase = 'annihilation';
        }
         if (matches.id === '2D4D') {
          data.phase = 'suppression';
        }
      },
    },
    { id: 'UWU 觉醒',
      type: 'GainsEffect',
      netRegex: { effectId: '5F9'},
      run: async (data, matches) => {
        var [c] = (await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.targetId, 16)],
        })).combatants;
        if (c.BNpcID==8722) { data.风神觉醒=true; }
        if (c.BNpcID==8730) { data.火神觉醒=true; }
        if (c.BNpcID==8727) { data.土神觉醒=true; }
      },
    },
    
    //风神
    { id: 'UWU 风神 螺旋气流',
      type: 'StartsUsing',
      netRegex: { id: '2B53'},
      run: (data, matches) => {
        postAoe(`{"Name":"风神 螺旋气流","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":10,"Angle":90,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":2.5}`);
      },
    },
    { id: 'UWU 风神 螺旋气流 计数',
      type: 'StartsUsing',
      netRegex: { id: '2B53', capture: false },
      run: (data) => data.螺旋气流计数++,
    },
    { id: 'UWU 风神 下行突风',
      // This always comes after a Slipstream so use that to trigger.
      // There is no castbar and the ability ids are the same.
      type: 'Ability',
      netRegex: { id: '2B53'},
      delaySeconds: (data) => data.螺旋气流计数 === 4 ? 10 : 0,
      run: async (data, matches) => {
        if (data.螺旋气流计数 === 1 || data.螺旋气流计数 > 4)
          return;

        var [c] = (await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        })).combatants;
        if (data.风神觉醒){
          postAoe(`{"Name":"风神 下行突风 分摊","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":${c.TargetID},"Radius":10,"Angle":90,"Rotation":0.0,"Color":1073807104,"Delay":0,"During":3.5}`);
        }else{
          postAoe(`{"Name":"风神 下行突风 顺劈","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":${c.TargetID},"Radius":10,"Angle":90,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":3.5}`);
        }
          
      },
    },
    
    { id: 'UWU 风神 邪轮旋风',
      type: 'StartsUsing',
      netRegex: { id: '2B4E'},
      condition: (data) => data.phase === 'garuda',
      run: (data, matches) => {
        postAoe(`{"Name":"风神 邪轮旋风","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":8.7,"Color":1073807359,"Delay":0,"During":3}`);
        if (data.风神觉醒)
        {
          postAoe(`{"Name":"风神 邪气龙卷","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":20,"InnerRadius":7,"Color":1073807359,"Delay":3,"During":3}`);
        }
      },
    },
    { id: 'UWU 风神 分身连线',
      type: 'Tether',
      // This happens in Garuda, as well in Annihilation and Suppression.
      netRegex: { id: '0004'},
      run: (data, matches) => {
        // cactbot-builtin-response
        
        if (data.phase === 'garuda'){
          if(data.风神接线人===undefined) data.风神接线人=[];

          var oldId=data.风神接线人[matches.sourceId];
          var newId=matches.targetId;
          removeAoe(`风神 分身连线 ${matches.sourceId}-${oldId}`);
          postAoe(`{"Name":"风神 分身连线 ${matches.sourceId}-${newId}","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${newId},"Radius":3,"Color":1073807359,"Delay":0,"During":5.5}`);
          data.风神接线人[matches.sourceId]=newId;
        }
      },
    },
    { id: 'UWU 风神 分身连线 消除',
      type: 'Ability',
      netRegex: { id: '2B49'},
      run:  (data, matches) => {
        removeAoe(`风神 分身连线 ${matches.sourceId}-${matches.targetId}`);
      },
    },
    { id: 'UWU 风神 挡枪位置',
      type: 'StartsUsing',
      netRegex: { id: '2B55',capture: false },
      condition: (data) => data.phase === 'garuda',
      delaySeconds: 19,
      run: async (data, matches) => {
        // These two sisters are added before the pull starts,
        // but they are the only two with these names.
        // 1645 = Suparna
        // 1646 = Chirada
        var combatantData = (await callOverlayHandler({
          call: 'getCombatants',
        })).combatants;
        const sisters = combatantData.filter((x) =>
          x.BNpcNameID === 1645 || x.BNpcNameID === 1646
        );
        var b1=Directions.xyTo4DirNum(sisters[0].PosX, sisters[0].PosY, centerX, centerY)>Directions.xyTo4DirNum(sisters[1].PosX, sisters[1].PosY, centerX, centerY) ? true:false;
        if (data.PartyIds.indexOf(data.myId)==0) {
          if (b1) {
            postAoe(`{"Name":"MT挡枪位置","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"ActorId","Centre2Value":${sisters[1].ID},"Thikness":10,"Color":4278255360,"Delay":0,"During":7}`);
          }else{
            postAoe(`{"Name":"MT挡枪位置","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"ActorId","Centre2Value":${sisters[0].ID},"Thikness":10,"Color":4278255360,"Delay":0,"During":7}`);
          }

        }
        if (data.PartyIds.indexOf(data.myId)==1) {
          if (b1) {
            postAoe(`{"Name":"ST挡枪位置","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"ActorId","Centre2Value":${sisters[0].ID},"Thikness":10,"Color":4278255360,"Delay":0,"During":7}`);
          }else{
            postAoe(`{"Name":"ST挡枪位置","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"ActorId","Centre2Value":${sisters[1].ID},"Thikness":10,"Color":4278255360,"Delay":0,"During":7}`);
          }
        }
        
        
      },
      
    },

    //火神
    { id: 'UWU 火神 开场 光辉炎柱位置',
      type: 'StartsUsing',
      netRegex: { id: '2B61' },
      delaySeconds:0.1,
      run: async (data, matches) => {
        var [c] = (await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        })).combatants;
        const posXVal = c.PosX;
        const posYVal = c.PosY;
        if (Math.abs(posXVal - 100) < 1) {
          if (Math.abs(posYVal - 82) < 1) {
            // North unsafe
            data.光辉炎柱安全区[0]=0;
          } else if (Math.abs(posYVal - 118) < 1) {
            // South unsafe
            data.光辉炎柱安全区[2]=0;
          }
        } else if (Math.abs(posYVal - 100) < 1) {
          if (Math.abs(posXVal - 82) < 1) {
            // West unsafe
            data.光辉炎柱安全区[3]=0;
          } else if (Math.abs(posXVal - 118) < 1) {
            // East unsafe
            data.光辉炎柱安全区[1]=0;
          }
        }
      },
    },
    { id: 'UWU 火神 开场 火神冲记录',
      type: 'StartsUsing',
      netRegex: { id: '2B5F' },
      run: async (data, matches) => {
        var [c] = (await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        })).combatants;
        
        if (Math.abs(c.PosX - 100) < 1) {
          data.光辉炎柱安全区[0]=0;
          data.光辉炎柱安全区[2]=0;
        } else if (Math.abs(c.PosY - 100) < 1) {
          data.光辉炎柱安全区[1]=0;
          data.光辉炎柱安全区[3]=0;
        }
        // console.log(`${data.光辉炎柱安全区}`);
      },
    },
    { id: 'UWU 火神 开场 光辉炎柱安全区',
      type: 'StartsUsing',
      netRegex: { id: '2B61'},
      suppressSeconds: 20,
      delaySeconds:0.2,
      run: (data, matches) => {
        console.log(`${data.光辉炎柱安全区}`);
        if (data.光辉炎柱安全区[0]===1) var pos= {posX:100,posY:84};
        if (data.光辉炎柱安全区[1]===1) var pos= {posX:116,posY:100};
        if (data.光辉炎柱安全区[2]===1) var pos= {posX:100,posY:116};
        if (data.光辉炎柱安全区[3]===1) var pos= {posX:84,posY:100};
        
        postAoe(`{"Name":"火神 开场 光辉炎柱安全区","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${pos.posX},"Y":0,"Z":${pos.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":4}`);
      },
    },

    //泰坦
    { id: 'UWU 土神 ID记录',
      type: 'StartsUsing',
      netRegex: { id: '2CFD'},
      run: (data, matches) => {
        data.土神ID=matches.sourceId;
        if (data.triggerSetConfig.UWU_P3_Marker) {
          PostNamazuMarkClear();
        }
      },
    },
    { id: 'UWU 土神 冲拳第一段',
      type: 'StartsUsing',
      netRegex: { id: ['2B70','2B7F']},
      // condition: (data, matches) => data.phase === 'titan',
      run: (data, matches) => {
        removeAoe(`一运泰坦 冲拳第一段预测`);
        postAoe(`{"Name":"泰坦 冲拳第一段","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":40,"Width":6,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":2.2}`)
      },
    },
    { id: 'UWU 土神 冲拳第二段',
      type: 'StartsUsing',
      netRegex: { id: '2C22'},
      run: (data, matches) => {
        postAoe(`{"Name":"泰坦 冲拳第二段","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":40,"Width":6,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":2.2}`)
      },
    },
   
    { id: 'UWU 土神 上天 安全点',
      type: 'NameToggle',
      netRegex: { toggle: '00'},
      condition: (data, matches) => data.土神ID === matches.id,
      delaySeconds:1,
      run: async (data) => {

        (data.泰坦上天 ??= 0);
        data.泰坦上天++;
        var [c] = (await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(data.土神ID, 16)],
        })).combatants;
      },
    },
    
    { id: 'UWU 土神 上天安全点',
      type: 'StartsUsing',
      netRegex: { id: '2B66' },
      promise: async (data,matches) => {
        data.titancom = (await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        })).combatants;
      },
      alertText: (data, matches, output) => {
        // var [c] = (await callOverlayHandler({
        //   call: 'getCombatants',
        //   ids: [parseInt(matches.sourceId, 16)],
        // })).combatants;
        var d=data.泰坦上天===1?15.5:11.5;
        var [c]=data.titancom;
        if(Math.abs(c.PosX - 100) < 1)
        {
          if ((c.PosY - 100)>1) {
            postAoe(`{"Name":"上天安全点连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":100,"Y":0,"Z":${100-d}},"Thikness":10,"Color":4278255360,"Delay":0,"During":3}`);
            postAoe(`{"Name":"上天安全点位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":${100-d}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":3}`);
            return output.a();

          }else{
            postAoe(`{"Name":"上天安全点连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":100,"Y":0,"Z":${100+d}},"Thikness":10,"Color":4278255360,"Delay":0,"During":3}`);
            postAoe(`{"Name":"上天安全点位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":${100+d}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":3}`);
            return output.c();
          }
        }else
        {
          if ((c.PosX - 100)>1) {
            postAoe(`{"Name":"上天安全点连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${100-d},"Y":0,"Z":100},"Thikness":10,"Color":4278255360,"Delay":0,"During":3}`);
            postAoe(`{"Name":"上天安全点位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${100-d},"Y":0,"Z":100},"Radius":0.3,"Color":1073807104,"Delay":0,"During":3}`);
            return output.d();
          }else{
            postAoe(`{"Name":"上天安全点连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${100+d},"Y":0,"Z":100},"Thikness":10,"Color":4278255360,"Delay":0,"During":3}`);
            postAoe(`{"Name":"上天安全点位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${100+d},"Y":0,"Z":100},"Radius":0.3,"Color":1073807104,"Delay":0,"During":3}`);
            return output.b();
          }
        }
      },
      outputStrings: {
        a: {
          cn: 'AAA',
        },
        b:{
          cn: 'Boy',
        },
        c: {
          cn: 'CCC',
        },
        d:{
          cn: 'Dog',
        },
      },
      
    },
    { id: 'UWU 土神 一杆入洞左右',
      type: 'AddedCombatant',
      netRegex: { npcNameId: '1803' },
      condition: (data, matches) => {
        (data.泰坦石头 ??= []).push(matches);
        return data.泰坦石头.length === 5;
      },
      run: (data, _matches) => {
        const bombs = (data.泰坦石头 ?? []).map((matches) => {
          return { x: parseFloat(matches.x), y: parseFloat(matches.y) };
        });
        if (bombs.length !== 5) {
          return;
        }
        // 5 bombs drop, and then a 6th later.
        // They all drop on one half of the arena, and then 3 on one half and 2 on the other.
        // e.g. all 5 drop on north half, 3 on west half, 2 on east half.
        const numDir = [0, 0, 0, 0]; // north, east, south, west
        for (const bomb of bombs) {
          if (bomb.y < centerY)
            numDir[0]++;
          else
            numDir[2]++;
          if (bomb.x < centerX)
            numDir[3]++;
          else
            numDir[1]++;
        }
        for (let idx = 0; idx < numDir.length; ++idx) {
          if (numDir[idx] !== 5)
            continue;
          // Example: dir is 1 (east), party is west, facing west.
          // We need to check dir 0 (north, aka "right") and dir 2 (south, aka "left").
          const numLeft = numDir[(idx + 1) % 4] ?? -1;
          const numRight = numDir[(idx - 1 + 4) % 4] ?? -1;
          if (numRight === 2 && numLeft === 3)
          {
            // 右
            if (idx === 0) { var pos = `{"X":99.5,"Y":0,"Z":110}`; data.三连桶石头pos={x:95,y:88};}//石头北
            if (idx === 1) { var pos = `{"X":90,"Y":0,"Z":99.5}`; data.三连桶石头pos={x:112,y:95};}//石头东
            if (idx === 2) { var pos = `{"X":100.5,"Y":0,"Z":90}`; data.三连桶石头pos={x:105,y:112};}//石头南
            if (idx === 3) { var pos = `{"X":110,"Y":0,"Z":100.5}`; data.三连桶石头pos={x:88,y:105};}//石头西
          }
          if (numRight === 3 && numLeft === 2)
          {
            // 左
            if (idx === 0) { var pos = `{"X":100.5,"Y":0,"Z":110}`; data.三连桶石头pos={x:105,y:88};}//石头北
            if (idx === 1) { var pos = `{"X":90,"Y":0,"Z":100.5}`; data.三连桶石头pos={x:112,y:105};}//石头东
            if (idx === 2) { var pos = `{"X":99.5,"Y":0,"Z":90}`; data.三连桶石头pos={x:95,y:112};}//石头南
            if (idx === 3) { var pos = `{"X":110,"Y":0,"Z":99.5}`; data.三连桶石头pos={x:88,y:95};}//石头西
          }
          postAoe(`{"Name":"一杆入洞击退位置连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":${pos},"Thikness":10,"Color":4278255360,"Delay":0,"During":3.5}`);
          postAoe(`{"Name":"一杆入洞击退位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":${pos},"Radius":0.3,"Color":1073807104,"Delay":0,"During":3.5}`);
        }
        
      },
      
    },
    { id: 'UWU 土神 三连桶',
      type: 'Ability',
      netRegex: { id: ['2B6C', '2B6B']},
      run: async (data, matches) => {
        (data.石牢点名 ??= []).push(parseInt(matches.targetId, 16));

        if (data.石牢点名.length === 3)
        {
          var sortAttay=[data.PartyIds[0],data.PartyIds[1],data.PartyIds[4],data.PartyIds[5],data.PartyIds[6],data.PartyIds[7],data.PartyIds[2],data.PartyIds[3],]
          data.石牢点名.sort((a, b) => {
            const aIdx = sortAttay.indexOf(a);
            const bIdx = sortAttay.indexOf(b);
            if (aIdx === -1 && bIdx !== -1)
              return 1;
            if (bIdx === -1 && aIdx !== -1)
              return -1;
            if (aIdx < bIdx)
              return -1;
            if (bIdx < aIdx)
              return 1;
          });
          if (data.triggerSetConfig.UWU_P3_Marker) {
            
            sendMark({ ActorID: data.石牢点名[0], MarkType: 'attack1', LocalOnly: false, });
            sendMark({ ActorID: data.石牢点名[1], MarkType: 'attack2', LocalOnly: false, });
            sendMark({ ActorID: data.石牢点名[2], MarkType: 'attack3', LocalOnly: false, });
            setTimeout(async () => {
              PostNamazuMarkClear();
            }, 20000);
          }
          ;
          var [c] = (await callOverlayHandler({
            call: 'getCombatants',
            ids: [parseInt(data.土神ID, 16)],
          })).combatants;

          var dx=(c.PosX-data.三连桶石头pos.x)/26.5;
          var dy=(c.PosY-data.三连桶石头pos.y)/26.5;
          var p1Pos=`{"X":${c.PosX-dx*9},"Y":0,"Z":${c.PosY-dy*9}}`;
          var p2Pos=`{"X":${c.PosX-dx*13.25},"Y":0,"Z":${c.PosY-dy*13.25}}`;
          var p3Pos=`{"X":${data.三连桶石头pos.x+dx*6.8},"Y":0,"Z":${data.三连桶石头pos.y+dy*6.8}}`;
          if (data.myId===data.石牢点名[0]) {
            postAoe(`{"Name":"三连桶1位置连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.石牢点名[0]},"Centre2Type":"PostionValue","Centre2Value":${p1Pos},"Thikness":10,"Color":4278255360,"Delay":0,"During":7}`);
            postAoe(`{"Name":"三连桶1位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":${p1Pos},"Radius":0.3,"Color":1073807104,"Delay":0,"During":7}`);
          }
          if (data.myId===data.石牢点名[1]) {
            postAoe(`{"Name":"三连桶2位置连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.石牢点名[1]},"Centre2Type":"PostionValue","Centre2Value":${p2Pos},"Thikness":10,"Color":4278255360,"Delay":0,"During":7}`);
            postAoe(`{"Name":"三连桶2位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":${p2Pos},"Radius":0.3,"Color":1073807104,"Delay":0,"During":7}`);
          }
          if (data.myId===data.石牢点名[2]) {
            postAoe(`{"Name":"三连桶3位置连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.石牢点名[2]},"Centre2Type":"PostionValue","Centre2Value":${p3Pos},"Thikness":10,"Color":4278255360,"Delay":0,"During":7}`);
            postAoe(`{"Name":"三连桶3位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":${p3Pos},"Radius":0.3,"Color":1073807104,"Delay":0,"During":7}`);
          }
          // console.log(`${data.PartyInfos[data.PartyIds.indexOf(data.石牢点名[0])].Name}-${data.PartyInfos[data.PartyIds.indexOf(data.石牢点名[1])].Name}-${data.PartyInfos[data.PartyIds.indexOf(data.石牢点名[2])].Name}`);  
          

        }
      },
      
    },

    //本体一运
    { id: 'UWU 一运',
      type: 'NameToggle',
      netRegex: { toggle: '00'},
      condition: (data, matches) => data.bossId.ultima === matches.id && data.phase === 'predation',
      run: (data, matches) => {
        var delay=2.2;
        postAoe(`{"Name":"神兵本体aoe","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${data.bossId.ultima},"Radius":14,"Color":1073807359,"Delay":10.5,"During":2}`);
        
        if (data.风神觉醒) {
          postAoe(`{"Name":"一运风神 邪气龙卷","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${data.bossId.garuda},"Radius":20,"InnerRadius":7,"Color":1073807359,"Delay":${delay},"During":${12.5-delay}}`);
        }else{
          postAoe(`{"Name":"一运风神 邪轮旋风","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${data.bossId.garuda},"Radius":8.7,"Color":1073807359,"Delay":${delay},"During":${12.5-delay}}`);
        }

        postAoe(`{"Name":"一运火神 深红旋风 一段","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${data.bossId.ifrit},"Length":44,"Width":18,"Rotation":0.0,"Color":1073807359,"Delay":${delay},"During":${10.5-delay}}`);
        if (data.火神觉醒) {
          postAoe(`{"Name":"一运火神 深红旋风 二段","AoeType":"Straight","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":100},"Length":44,"Width":10,"Rotation":00,"Color":1073807359,"Delay":10.5,"During":2}`);
          postAoe(`{"Name":"一运火神 深红旋风 二段","AoeType":"Straight","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":100},"Length":44,"Width":10,"Rotation":90,"Color":1073807359,"Delay":10.5,"During":2}`);
        }

        postAoe(`{"Name":"一运泰坦 冲拳第一段预测","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${data.bossId.titan},"Length":40,"Width":6,"Rotation":0.0,"Color":1073807359,"Delay":${delay},"During":${10.5-delay}}`);
        postAoe(`{"Name":"一运泰坦 冲拳第一段预测","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${data.bossId.titan},"Length":40,"Width":6,"Rotation":45.0,"Color":1073807359,"Delay":${delay},"During":${10.5-delay}}`);
        postAoe(`{"Name":"一运泰坦 冲拳第一段预测","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${data.bossId.titan},"Length":40,"Width":6,"Rotation":135.0,"Color":1073807359,"Delay":${delay},"During":${10.5-delay}}`);
        postAoe(`{"Name":"一运泰坦 冲拳第一段预测","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${data.bossId.titan},"Length":40,"Width":6,"Rotation":-45.0,"Color":1073807359,"Delay":${delay},"During":${10.5-delay}}`);
        postAoe(`{"Name":"一运泰坦 冲拳第一段预测","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${data.bossId.titan},"Length":40,"Width":6,"Rotation":-135.0,"Color":1073807359,"Delay":${delay},"During":${10.5-delay}}`);
      
        setTimeout(async () => {
          var [g] = (await callOverlayHandler({
            call: 'getCombatants',
            ids: [parseInt(data.bossId.garuda, 16)],
          })).combatants;
          var [t] = (await callOverlayHandler({
            call: 'getCombatants',
            ids: [parseInt(data.bossId.titan, 16)],
          })).combatants;
          var [u] = (await callOverlayHandler({
            call: 'getCombatants',
            ids: [parseInt(data.bossId.ultima, 16)],
          })).combatants;
          var sr=[1,1,1,1];

          if (Math.abs(u.PosX-88)<1) {sr[3]=2;} else{sr[1]=2};
          if (Math.abs(u.PosY-88)<1) {sr[0]=2;} else{sr[2]=2};
          
          if (Math.abs(g.PosX-97)<1) {sr[3]=0;} else{sr[1]=0};
          if (Math.abs(g.PosY-97)<1) {sr[0]=0;} else{sr[2]=0};
  
          if (Math.abs(t.PosY-83)<1) {sr[0]=0;};
          if (Math.abs(t.PosY-117)<1) {sr[2]=0;};
          if (Math.abs(t.PosX-117)<1) {sr[1]=0;};
          if (Math.abs(t.PosX-83)<1) {sr[3]=0;};
  
          
  
          var spos=['{"X":100,"Y":0,"Z":81}','{"X":119,"Y":0,"Z":100}','{"X":100,"Y":0,"Z":119}','{"X":81,"Y":0,"Z":100}'];
          
          
          for (let i = 0; i < 4; i++) {
            if (sr[i]===1) {
              postAoe(`{"Name":"一运安全区","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":${spos[i]},"Thikness":10,"Color":4278255360,"Delay":0,"During":${10.5-delay}}`);
              var isok=true;
              break;
            }
          }
          for (let i = 0; i < 4; i++) {
            if (sr[i]===2 && !isok) {
              postAoe(`{"Name":"一运安全区","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":${spos[i]},"Thikness":10,"Color":4278255360,"Delay":0,"During":${10.5-delay}}`); 
              break;
            }
          }
        }, delay*1500);
        
      },
    },
    { id: 'UWU 一运 走提示',
      type: 'NameToggle',
      netRegex: { toggle: '00'},
      condition: (data, matches) => data.bossId.ultima === matches.id && data.phase === 'predation',
      delaySeconds:10.5,
      alertText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          cn: '走走走',
        },
      },
    },
    
    // 本体二运
    
    { id: 'UWU 二运 火神冲',
      type: 'StartsUsing',
      netRegex: { id: ['2B5F']},
      condition: (data, matches) => data.phase === 'annihilation',
      run: (data, matches) => {
        postAoe(`{"Name":"一运火神 深红旋风 一段","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${data.bossId.ifrit},"Length":44,"Width":18,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":3}`);
        if (data.火神觉醒) {
          postAoe(`{"Name":"一运火神 深红旋风 二段","AoeType":"Straight","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":100},"Length":44,"Width":10,"Rotation":00,"Color":1073807359,"Delay":3,"During":2}`);
          postAoe(`{"Name":"一运火神 深红旋风 二段","AoeType":"Straight","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":100},"Length":44,"Width":10,"Rotation":90,"Color":1073807359,"Delay":3,"During":2}`);
        }
      },
    },
    { id: 'UWU 二运 ST l连线球',
      type: 'AddedCombatant',
      netRegex: { npcNameId: '2138'},
      run: (data , matches) => {
        if (data.PartyIds[1]==data.myId) {
          postAoe(`{"Name":"二运 ST l连线球 0x${matches.id}","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"ActorId","Centre2Value":0x${matches.id},"Thikness":10,"Color":4278255360,"Delay":0,"During":10}`);
        }
      },
    },
    { id: 'UWU 二运 ST l连线球消除',
    // This always comes after a Slipstream so use that to trigger.
    // There is no castbar and the ability ids are the same.
    type: 'Ability',
    netRegex: { id: '2B81'},
    run: (data, matches) => {
      removeAoe(`二运 ST l连线球 0x${matches.sourceId}`);
    },
  },

    //操作
    { id: 'UWU 坦克LB',
      type: 'StartsUsing',
      netRegex: { id: '2B8B', capture: false },
      condition: (data) => data.role === 'tank',
      run: (data, matches) => {
        pluginSetting(`AttackOff`);
        pluginSetting(`ClearSkillQueue`);
        if (data.PartyInfos.find((v) => v.Id === data.myId).Job=='21') {
          sendAction(4240,`E0000000`,0,true);
        }
        setTimeout(() => {
          pluginSetting(`AttackOn`);
        }, 1000);
        pluginSetting(`BurstOn`);
      },
    },
    { id: 'UWU 本体开场 舞者跳舞',
      type: 'StartsUsing',
      netRegex: { id: '2B8B', capture: false },
      suppressSeconds:9999,
      run: (data, matches) => {
        if (data.PartyInfos.find((v) => v.Id === data.myId).Job=='38') {
          sendAction(15997,`E0000000`,0,true);
          setTimeout(() => {
            sendAction(15997,`E0000000`,0,true);
          }, 10000);
          setTimeout(() => {
            sendAction(15998,`E0000000`,0,true);
          }, 30000);
        }
        pluginSetting(`AttackOn`);
        pluginSetting(`BurstOn`);
      },
    },
    { id: 'UWU 风神 分身关爆发',
      type: 'Tether',
      // This happens in Garuda, as well in Annihilation and Suppression.
      netRegex: { id: '0004'},
      condition: (data) => data.phase === 'garuda',
      run: (data, matches) => {
        pluginSetting(`BurstOff`);
      },
    },
    { id: 'UWU 土神 落地 突进',
      type: 'NameToggle',
      netRegex: { toggle: '01'},
      condition: (data, matches) => data.土神ID === matches.id,
      run: (data, matches) => {
        var delay=0;
        if (data.titanIs) {
          if (data.PartyInfos.find((v) => v.Id === data.myId).Job=='21') {
            sendAction(7386,matches.id,0,true);
          }
          delay=200;
          pluginSetting(`AttackOff`);
        }
        pluginSetting(`ClearSkillQueue`);
        setTimeout(() => {
          target(`0x${matches.id}`);
          pluginSetting(`AttackOn`);
        }, delay);
        data.titanIs=true;
        // console.log(data.PartyInfos.find((v) => v.Id === data.myId).Job);
      },
    },
    { id: 'UWU 火神 开场 开爆发开盾',
      type: 'StartsUsing',
      netRegex: { id: '2B5F' },
      suppressSeconds:9999,
      run: (data, matches) => {
        pluginSetting(`BurstOn`);
        if (data.PartyIds[1]==data.myId) {
          if (data.PartyInfos.find((v) => v.Id === data.myId).Job=='21') {
            sendAction(48,matches.id,0,true);
          }
        }
      },
    },
    { id: 'UWU boss可选中 选中',
      type: 'NameToggle',
      netRegex: { toggle: '01'},
      condition: (data, matches) => (data.bossId.garuda === matches.id || data.bossId.ifrit === matches.id || data.bossId.ultima === matches.id),
      run: (data, matches) => {
          target(`0x${matches.id}`);
      },
    },
    { id: "UWU 开场st关盾",
      regex:
        /^.{14} ChatLog 00:[^:]*:[^:]*:(?:距离战斗开始还有|Battle commencing in |戦闘開始まで)5[^（]+/,
      run: (data, matches) => {
        if (data.PartyIds[1] == data.myId) {
          if (data.PartyInfos.find((v) => v.Id === data.myId).Job == '21') {
            sendAction(32066, `E0000000`, 0, true);
          }
        }
      },
    },
    { id: 'UWU 风神 刺羽出现 挑衅',
      type: 'AddedCombatant',
      netRegex: { npcNameId: '2091'},
      run: (data, matches) => {
        if (data.PartyIds[1] == data.myId) {
          sendAction(7533, matches.id, 0.5, true);
          sendAction(7531, matches.id, 5, false);
          if (data.PartyInfos.find((v) => v.Id === data.myId).Job=='21') {
            sendAction(25751, `E0000000`, 7.5, false);
          }
            
        }
        // console.log(`${matches.id}`);
      },
    },
    { id: 'UWU sanyun',
    // This always comes after a Slipstream so use that to trigger.
    // There is no castbar and the ability ids are the same.
    type: 'Ability',
    netRegex: { id: '2B81'},
    run: (data, matches) => {
      removeAoe(`二运 ST l连线球 0x${matches.sourceId}`);
    },
  },
    

    // --------- Phases & Buff Tracking ----------
    
    // {
    //   // Wait after suppression for primal triggers at the end.
    //   id: 'UWU 分P结束',
    //   type: 'Ability',
    //   netRegex: { source: 'The Ultima Weapon', id: '2D4D', capture: false },
    //   delaySeconds: 74,
    //   run: (data) => data.phase = 'finale',
    // },
    // {
    
    
    
    // {
    //   id: 'UWU 低气压 获得',
    //   type: 'GainsEffect',
    //   netRegex: { effectId: '5F5' },
    //   run: (data, matches) => data.thermalLow[matches.target] = parseInt(matches.count),
    // },
    // {
    //   id: 'UWU 低气压 失去',
    //   type: 'LosesEffect',
    //   netRegex: { effectId: '5F5' },
    //   run: (data, matches) => data.thermalLow[matches.target] = 0,
    // },
    // {
    //   id: 'UWU 极限突破 获得',
    //   type: 'GainsEffect',
    //   netRegex: { effectId: '5FA' },
    //   run: (data, matches) => data.beyondLimits.add(matches.target),
    // },
    // {
    //   id: 'UWU 极限突破 失去',
    //   type: 'LosesEffect',
    //   netRegex: { effectId: '5FA' },
    //   run: (data, matches) => data.beyondLimits.delete(matches.target),
    // },
    // // --------- Garuda ----------
    
    // {
    //   //挡枪
    //   id: 'UWU 风神 寒风之歌点名',
    //   type: 'HeadMarker',
    //   netRegex: { id: '0010' },
    //   condition: Conditions.targetIsYou(),
    //   alertText: (_data, _matches, output) => output.text(),
    //   outputStrings: {
    //     text: {
    //       en: 'Mistral on YOU',
    //       de: 'Mistral-Song',
    //       fr: 'Mistral sur VOUS',
    //       ja: 'ミストラルソング',
    //       cn: '寒风之歌点名',
    //       ko: '삭풍 징',
    //     },
    //   },
    // },
    
    
    // {
    
    
    
    // // --------- Ifrit ----------
    // {
    //   id: 'UWU Ifrit Possible ID Locator',
    //   type: 'StartsUsing',
    //   netRegex: { id: '2B55', source: 'Garuda', capture: false },
    //   // Run this after the initial Garuda trigger and just piggyback off its call to `getCombatants`
    //   // We're just looking to pluck the four possible IDs from the array pre-emptively to avoid doing
    //   // that filter on every `CombatantMemory` line
    //   delaySeconds: 25,
    //   run: (data) => {
    //     data.possibleIfritIDs = data.combatantData
    //       .filter((c) => c.BNpcNameID === 0x4A1)
    //       .map((c) => c.ID?.toString(16).toUpperCase() ?? '');
    //   },
    // },
    
    
    // {
    //   id: 'UWU Ifrit Vulcan Burst',
    //   type: 'StartsUsing',
    //   netRegex: { id: '25B7', source: 'Ifrit', capture: false },
    //   response: Responses.knockback(),
    // },
    // {
    //   id: 'UWU 火神 柱子 出现',
    //   type: 'AddedCombatant',
    //   netRegex: { npcNameId: '1186', npcBaseId: '8731' },
    //   condition: (data, matches) => {
    //     data.nailAdds.push(matches);
    //     return data.nailAdds.length === 4;
    //   },
    //   alertText: (data, _matches, output) => {
    //     // Nails are always on cardinals and intercardinals.
    //     // The back two nails are always 135 degrees apart and the front two are 45 degrees apart,
    //     // and the front and back nails are 90 degrees apart from each other. Thus, you can figure
    //     // out the orientation based on relative positions from the origin.
    //     //
    //     // One possible example of directions:
    //     // 0 = back right
    //     // 3 = back left
    //     // 5 = front left
    //     // 6 = front right
    //     const dirs = data.nailAdds.map((m) => {
    //       return Directions.addedCombatantPosTo8Dir(m, centerX, centerY);
    //     }).sort();
    //     for (let i = 0; i < dirs.length; ++i) {
    //       const this8Dir = dirs[i];
    //       const next8Dir = dirs[(i + 1) % dirs.length];
    //       if (this8Dir === undefined || next8Dir === undefined)
    //         break;
    //       // The two close nails are 45 degrees apart.
    //       if (next8Dir - this8Dir === 1 || this8Dir - next8Dir === 7) {
    //         const between16Dir = this8Dir * 2 + 1;
    //         const outputKey = Directions.output16Dir[between16Dir] ?? 'unknown';
    //         return output.text({ dir: output[outputKey]() });
    //       }
    //     }
    //   },
    //   outputStrings: {
    //     text: {
    //       en: 'Near: ${dir}',
    //       de: 'Nahe: ${dir}',
    //       cn: '近: ${dir}',
    //       ko: '가까운 기둥: ${dir}',
    //     },
    //     ...Directions.outputStrings16Dir,
    //   },
    // },
    // {
    //   id: 'UWU 火神 柱子 死亡',
    //   type: 'Ability',
    //   netRegex: { id: '2B58' },
    //   condition: (data, matches) => {
    //     if (data.nailDeaths[matches.sourceId] === undefined) {
    //       data.nailDeaths[matches.sourceId] = matches;
    //       data.nailDeathOrder.push(matches.sourceId);
    //     }
    //     return data.nailDeathOrder.length === 4;
    //   },
    //   suppressSeconds: 999999,
    //   run: (data) => {
    //     // No need to check awoken status here, we'll just look for the status effect later.
    //     const idToDir = {};
    //     // lastDir is an 8-value direction but modulo 4.
    //     let lastDir;
    //     let lastRotationDir;
    //     for (const key of data.nailDeathOrder) {
    //       const m = data.nailDeaths[key];
    //       if (m === undefined)
    //         return;
    //       const x = parseFloat(m.x);
    //       const y = parseFloat(m.y);
    //       // Since dashes go through one direction and its opposite, map to N/NE/E/SE zone.
    //       // Consider a valid kill order to be sequential in either direction.
    //       // Most people do Z or reverse Z, but there's many valid orders (e.g. bowtie/fish).
    //       const this8Dir = Directions.xyTo8DirNum(x, y, centerX, centerY);
    //       idToDir[m.sourceId] = this8Dir;
    //       const thisDir = this8Dir % 4;
    //       if (lastDir === undefined) {
    //         lastDir = thisDir;
    //         continue;
    //       }
    //       const isCW = thisDir - lastDir === 1 || lastDir - thisDir === 3;
    //       const isCCW = lastDir - thisDir === 1 || thisDir - lastDir === 3;
    //       const thisRotationDir = isCW ? 'cw' : isCCW ? 'ccw' : undefined;
    //       lastDir = thisDir;
    //       // Invalid nail kill order.
    //       if (thisRotationDir === undefined)
    //         return;
    //       if (lastRotationDir === undefined) {
    //         lastRotationDir = thisRotationDir;
    //         continue;
    //       }
    //       // Invalid nail kill order.
    //       if (thisRotationDir !== lastRotationDir)
    //         return;
    //     }
    //     const firstNailId = data.nailDeathOrder[0];
    //     const lastNailId = data.nailDeathOrder[3];
    //     data.nailDeathRotationDir = lastRotationDir;
    //     if (firstNailId !== undefined)
    //       data.nailDeathFirst8Dir = idToDir[firstNailId];
    //     if (lastNailId !== undefined)
    //       data.nailDeathLast8Dir = idToDir[lastNailId];
    //   },
    // },
    // {
    //   id: 'UWU 火神 连线',
    //   type: 'Tether',
    //   // This is GainsEffect effectId 179 as well applied to each player
    //   // but reapplied when the count changes due to distance.
    //   netRegex: { id: '0009' },
    //   condition: (data, matches) =>
    //     matches.target === data.me || matches.source === data.me,
    //   infoText: (data, matches, output) => {
    //     const otherPlayer = matches.target === data.me ? matches.source : matches.target;
    //     return output.fetters({ player: data.party.member(otherPlayer) });
    //   },
    //   outputStrings: {
    //     fetters: {
    //       en: 'Fetters (w/${player})',
    //       de: 'Fesseln (mit ${player})',
    //       cn: '锁链 (与 /${player})',
    //       ko: '사슬 (+${player})',
    //     },
    //   },
    // },
    // {
    //   id: 'UWU 火神 火圈点名',
    //   type: 'StartsUsing',
    //   netRegex: { id: '2B5B', source: 'Ifrit' },
    //   condition: Conditions.targetIsYou(),
    //   alarmText: (_data, _matches, output) => output.text(),
    //   outputStrings: {
    //     text: {
    //       en: 'Searing Wind on YOU',
    //       de: 'Versengen auf DIR',
    //       fr: 'Carbonisation sur VOUS',
    //       ja: '自分に灼熱',
    //       cn: '灼热咆哮点名',
    //       ko: '작열 대상자',
    //     },
    //   },
    // },
    // {
    //   id: 'UWU 火神 地狱之火炎',
    //   type: 'StartsUsing',
    //   netRegex: { id: '2B5E', source: 'Ifrit', capture: false },
    //   condition: (data) => data.phase === 'ifrit',
    //   response: Responses.aoe(),
    // },
    // {
    //   id: 'UWU 火神 上天 计数器',
    //   type: 'NameToggle',
    //   netRegex: { name: 'Ifrit', toggle: '00', capture: false },
    //   run: (data) => data.ifritUntargetableCount++,
    // },
    // {
    //   id: 'UWU Ifrit Dash Safe Spot 1',
    //   // TODO: we could add a config option for the other set of safe spots, as it's also
    //   // valid to go SW/NE instead of SE/NW for the first dashes. It would just change
    //   // the adjust call.
    //   comment: {
    //     en: `If the first nail is SE, this will call SE/NW for both reverse-Z and normal-Z.
    //          If the first nail is S, this will call SE/NW for reverse-Z and SW/NE for normal-Z.
    //          Other nail orders are also supported, these are just examples.`,
    //     de:
    //       `Wenn der erste Nagel SO ist, wird dies SO/NW sowohl für Umgekehrtes-Z als auch für Normal-Z aufgerufen.
    //          Wenn der erste Nagel S ist, wird dies SO/NW für Umgekehrtes-Z und SW/NO für Normal-Z aufgerufen.
    //          Andere Nagelreihenfolgen werden ebenfalls unterstützt, dies sind nur Beispiele.`,
    //     cn: `如果第一个火神柱在东南，则反向 Z 和正常 Z 都会提示东南/西北
    //          如果第一个火神柱在南, 则反向 Z 将提示东南/西北，正常 Z 将提示西南/东北。
    //          这些只是示例, 还支持其他火神柱顺序。`,
    //     ko: `첫 번째 기둥이 남동쪽인 경우, 역방향 Z와 일반 Z 모두에 대해 남동/북서를 호출합니다.
    //          첫 번째 기둥이 남쪽인 경우, 역방향 Z는 남동/북서를, 일반 Z는 남서/북동를 호출합니다.
    //          다른 기둥 순서도 지원되며, 이는 예시일 뿐입니다.`,
    //   },
    //   type: 'NameToggle',
    //   netRegex: { name: 'Ifrit', toggle: '00', capture: false },
    //   condition: (data) => data.ifritUntargetableCount === 1,
    //   durationSeconds: 5,
    //   alertText: (data, _matches, output) => {
    //     const firstNailDir = data.nailDeathFirst8Dir;
    //     const rotationType = data.nailDeathRotationDir;
    //     if (firstNailDir === undefined || rotationType === undefined)
    //       return;
    //     const oppositeRotation = rotationType === 'cw' ? 7 : 1;
    //     const isIntercard = firstNailDir % 2 === 1;
    //     // For the first jump, we need to end on an intercard.
    //     // If we're already on an intercard, just stop there. IMO, it's better to have the first
    //     // Ifrit jump directly on the party where it's obvious which way you need to adjusut.
    //     // For the second jump, the first Ifrit jumps directly on the first nail location,
    //     // if that's not an intercard, initial start is good, otherwise party needs to rotate 45
    //     // in the opposite direction they will be rotating to avoid dashes.
    //     const dir1 = isIntercard ? firstNailDir : (firstNailDir + oppositeRotation) % 8;
    //     const dir2 = (dir1 + 4) % 8;
    //     const dir1Str = output[Directions.outputFrom8DirNum(dir1)]();
    //     const dir2Str = output[Directions.outputFrom8DirNum(dir2)]();
    //     return output.intercardSafeSpot({ dir1: dir1Str, dir2: dir2Str });
    //   },
    //   outputStrings: {
    //     intercardSafeSpot: {
    //       en: '${dir1} / ${dir2}',
    //       de: '${dir1} / ${dir2}',
    //       cn: '${dir1} / ${dir2}',
    //       ko: '${dir1} / ${dir2}',
    //     },
    //     ...Directions.outputStrings8Dir,
    //   },
    // },
    // {
    //   id: 'UWU Ifrit Dash Safe Spot 2 Adjust',
    //   comment: {
    //     en: `If the first nail was on an intercard, then the first Ifrit dash is on an intercard
    //          and this optional call is to move to be adjacent to that first dash.
    //          If you are already safe, this will not be called.`,
    //     de:
    //       `Wenn der erste Nagel Interkardinal war, dann ist der erste Ifrit-Ansturm auf einer Interkardinalen
    //          und dieser optionale Aufruf besteht darin, sich in die Nähe dieses ersten Ansturms zu bewegen.
    //          Wenn man bereits in Sicherheit ist, wird dies nicht aufgerufen.`,
    //     cn: `如果第一个火神柱在对角线上，那么第一次火神冲也在对角线上。
    //          这个可选提示会提示你移动到第一次火神冲附近的位置。
    //          如果你已在安全区，则不会输出此提示。`,
    //     ko: `첫 번째 기둥이 대각선에 있으면 첫 번째 이프리트 돌진도 대각선에 있으며,
    //          이 알람은 첫 번째 돌진 옆으로 이동하라는 것이 됩니다.
    //          이미 안전하다면 이 알람은 호출되지 않습니다.`,
    //   },
    //   type: 'NameToggle',
    //   netRegex: { name: 'Ifrit', toggle: '00', capture: false },
    //   // Unfortunately no way to know for sure if Ifrit dies before dashes.
    //   condition: (data) => data.ifritUntargetableCount === 2 && data.ifritAwoken,
    //   infoText: (data, _matches, output) => {
    //     const firstNailDir = data.nailDeathFirst8Dir;
    //     const rotationType = data.nailDeathRotationDir;
    //     if (firstNailDir === undefined || rotationType === undefined)
    //       return;
    //     // If we didn't start on an intercard, then we are already safe.
    //     const isIntercard = firstNailDir % 2 === 1;
    //     if (!isIntercard)
    //       return;
    //     // Adjust the opposite direction of rotation, e.g. we are rotating clockwise
    //     // and Ifrit hops on the party SE, the party needs to go to E to rotate into
    //     // the first Ifrit at SE.
    //     const dirStr = rotationType === 'cw' ? output.counterclockwise() : output.clockwise();
    //     return output.text({ rotation: dirStr });
    //   },
    //   outputStrings: {
    //     text: {
    //       en: 'Adjust 45° ${rotation}',
    //       de: 'Rotiere 45° ${rotation}',
    //       cn: '${rotation} 旋转 45°',
    //       ko: '${rotation} 45° 이동',
    //     },
    //     clockwise: Outputs.clockwise,
    //     counterclockwise: Outputs.counterclockwise,
    //   },
    // },
    // {
    //   id: 'UWU Ifrit Dash Safe Spot 2',
    //   comment: {
    //     en: `This is the major movement for the Ifrit dashes starting adjacent to the first dash.
    //          Both the party and the healer will move either 45 or 90 degrees.
    //          It is a "fast" movement if you need to move fast to avoid the Ifrit follow-up dash.
    //          It is a "slow" movement if you have extra time to do this.`,
    //     de:
    //       `Dies ist die Hauptbewegung für die Ifrit-Anstürme, die in der Nähe des ersten Ansturms beginnt.
    //          Sowohl die Gruppe als auch der Heiler bewegen sich entweder um 45 oder 90 Grad.
    //          Es ist eine "schnelle" Bewegung, wenn man sich schnell bewegen muss, um dem Ifrit-Folgeschlag auszuweichen.
    //          Es ist eine "langsame" Bewegung, wenn man mehr Zeit hat, dies zu tun.`,
    //     cn: `这是从第一次火神冲附近开始的火神冲主要移动。
    //          人群和奶妈都将移动 45 度或 90 度。
    //          "快" 可以让你快速移动，躲避第二次火神冲。
    //          "慢" 当你有足够的时间来移动时使用。`,
    //     ko: `첫 번째 돌진 직후부터 시작되는 이프리트 돌진의 주요 동선입니다.
    //          본대와 힐러 모두 45도 또는 90도로 움직입니다.
    //          이프리트의 후속 돌진을 피하기 위해 빠르게 이동해야 하는 경우 "빠른" 이동입니다.
    //          시간적 여유가 있다면 "느린" 이동입니다.`,
    //   },
    //   type: 'NameToggle',
    //   netRegex: { name: 'Ifrit', toggle: '00', capture: false },
    //   condition: (data) => data.ifritUntargetableCount === 2 && data.ifritAwoken,
    //   // Here's one log file example for this timing.
    //   // [20:38:36.510] NameToggle 22:40017C12:Ifrit:40017C12:Ifrit:00
    //   // [20:38:38.245] 261 105:Change:40017C12:Heading:2.3562:PosX:86.3000:PosY:113.7000:PosZ:0.0000
    //   // [20:38:40.919] StartsCasting 14:40017C0F:Ifrit:2B5F:Crimson Cyclone:40017C0F:Ifrit:2.700:113.70:113.70:0.00:-2.36
    //   // [20:38:42.343] StartsCasting 14:40017C11:Ifrit:2B5F:Crimson Cyclone:40017C11:Ifrit:2.700:100.00:80.50:0.00:0.00
    //   // [20:38:43.725] StartsCasting 14:40017C12:Ifrit:2B5F:Crimson Cyclone:40017C12:Ifrit:2.700:86.30:113.70:0.00:2.36
    //   // [20:38:45.152] StartsCasting 14:40017C10:Ifrit:2B5F:Crimson Cyclone:40017C10:Ifrit:2.700:80.50:100.00:0.00:1.57
    //   delaySeconds: 2.5,
    //   promise: async (data) => {
    //     data.combatantData = [];
    //     if (data.bossId.ifrit === undefined)
    //       return;
    //     // The real Ifrit is the one that is Awoken so find where he is.
    //     data.combatantData = (await callOverlayHandler({
    //       call: 'getCombatants',
    //       ids: [parseInt(data.bossId.ifrit, 16)],
    //     })).combatants;
    //   },
    //   alertText: (data, _matches, output) => {
    //     // If killed before dashes occur, and geocrush has started casting, suppress this.
    //     if (data.phase === 'titan')
    //       return;
    //     const [combatant] = data.combatantData;
    //     if (combatant === undefined || data.combatantData.length !== 1)
    //       return;
    //     const firstNailDir = data.nailDeathFirst8Dir;
    //     const rotationType = data.nailDeathRotationDir;
    //     if (firstNailDir === undefined || rotationType === undefined)
    //       return;
    //     const oppositeRotationDir = rotationType === 'cw' ? -1 : 1;
    //     const rotationDir = rotationType === 'cw' ? 1 : -1;
    //     const startDir = (firstNailDir + oppositeRotationDir + 8) % 8;
    //     const ifritDir = Directions.combatantStatePosTo8Dir(combatant, centerX, centerY);
    //     for (let i = 1; i <= 4; ++i) {
    //       const dashDir = (startDir + i * rotationDir + 8) % 8;
    //       if (dashDir % 4 !== ifritDir % 4)
    //         continue;
    //       // If Ifrit is the first or third dash, we rotate 45 degrees, otherwise 90.
    //       const finalRotation = (i === 1 || i === 3) ? rotationDir : rotationDir * 2;
    //       const finalDir = (startDir + finalRotation + 8) % 8;
    //       const finalDirStr = output[Directions.outputFrom8DirNum(finalDir)]();
    //       const rotation = rotationType === 'cw' ? output.clockwise() : output.counterclockwise();
    //       if (i === 1)
    //         return output.awokenDash1({ rotation: rotation, dir: finalDirStr });
    //       if (i === 2)
    //         return output.awokenDash2({ rotation: rotation, dir: finalDirStr });
    //       if (i === 3)
    //         return output.awokenDash3({ rotation: rotation, dir: finalDirStr });
    //       if (i === 4)
    //         return output.awokenDash4({ rotation: rotation, dir: finalDirStr });
    //     }
    //   },
    //   outputStrings: {
    //     awokenDash1: {
    //       en: '${rotation} 45° to ${dir} (fast)',
    //       de: '${rotation} 45° nach ${dir} (schnell)',
    //       cn: '${rotation} 45° 到 ${dir} (快)',
    //       ko: '${rotation} 45° ${dir}까지 (빠름)',
    //     },
    //     awokenDash2: {
    //       en: '${rotation} 90° to ${dir} (fast)',
    //       de: '${rotation} 90° nach ${dir} (schnell)',
    //       cn: '${rotation} 90° 到 ${dir} (快)',
    //       ko: '${rotation} 90° ${dir}까지 (빠름)',
    //     },
    //     awokenDash3: {
    //       en: '${rotation} 45° to ${dir} (slow)',
    //       de: '${rotation} 45° nach ${dir} (langsam)',
    //       cn: '${rotation} 45° 到 ${dir} (慢)',
    //       ko: '${rotation} 45° ${dir}까지 (느림)',
    //     },
    //     awokenDash4: {
    //       en: '${rotation} 90° to ${dir} (slow)',
    //       de: '${rotation} 90° nach ${dir} (langsam)',
    //       cn: '${rotation} 90° 到 ${dir} (慢)',
    //       ko: '${rotation} 90° ${dir}까지 (느림)',
    //     },
    //     clockwise: Outputs.clockwise,
    //     counterclockwise: Outputs.counterclockwise,
    //     ...Directions.outputStrings8Dir,
    //   },
    // },
    // {
    //   id: 'UWU 火神 集合分摊',
    //   type: 'HeadMarker',
    //   netRegex: { id: '0075', capture: false },
    //   alertText: (_data, _matches, output) => output.text(),
    //   outputStrings: {
    //     text: {
    //       en: 'Stack',
    //       de: 'Stack',
    //       fr: 'Packez-vous',
    //       ja: '頭割り',
    //       cn: '集合',
    //       ko: '집합',
    //     },
    //   },
    // },


    // // --------- Titan ----------
    
    
    // // --------- Intermission ----------
    
    // {
    //   id: 'UWU Ultima',
    //   type: 'StartsUsing',
    //   netRegex: { id: '2B8B', capture: false },
    //   condition: (data) => data.role === 'tank',
    //   alarmText: (_data, _matches, output) => output.text(),
    //   outputStrings: {
    //     text: {
    //       en: 'Tank LB NOW',
    //       de: 'JETZT Tank LB',
    //       fr: 'Transcendance Tank maintenant !',
    //       ja: '今タンクLB',
    //       cn: '坦克LB',
    //       ko: '탱리밋',
    //     },
    //   },
    // },
    // // --------- Predation ----------
    // {
    //   id: 'UWU Predation',
    //   comment: {
    //     en: '"early safe" here means that you can move before the first Ifrit dash.',
    //     de:
    //       '"früh sicher" bedeutet hier, dass man such auch schon for dem ersten Ifrit Dash bewegen kann.',
    //     cn: '这里的 "提前安全" 指你可以在伊弗利特第一次冲锋前移动。',
    //     ko: '여기서 "안전"이란 첫 이프리트 돌진 전에 미리 가 있어도 된다는 의미입니다.',
    //   },
    //   type: 'StartsUsing',
    //   netRegex: { id: '2B76', source: 'The Ultima Weapon', capture: false },
    //   // [21:55:41.426] StartsCasting 14:4000BB88:The Ultima Weapon:2B76:Ultimate Predation:4000BB88:The Ultima Weapon:2.700:99.99:89.98:0.00:3.14
    //   // [21:55:44.404] ActionEffect 15:4000BB88:The Ultima Weapon:2B76:Ultimate Predation:4000BB88:The Ultima Weapon:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:3215688:3746181:0:10000:::99.99:89.98:0.00:3.14:3215688:3746181:0:10000:::99.99:89.98:0.00:3.14:0000A459:0:1
    //   // [21:55:48.850] NameToggle 22:4000BB88:The Ultima Weapon:4000BB88:The Ultima Weapon:00
    //   // [21:55:50.500] 261 105:Change:4000BB8E:Heading:-2.3563:PosX:103.0000:PosY:103.0000:PosZ:0.0000
    //   // [21:55:50.500] 261 105:Change:4000BB89:Heading:-1.5709:PosX:117.0000:PosY:97.0000:PosZ:0.0000
    //   // [21:55:50.500] 261 105:Change:4000BB8D:Heading:-2.3563:PosX:113.7000:PosY:113.7000:PosZ:0.0000
    //   // [21:55:50.500] 261 105:Change:4000BB88:Heading:2.3562:PosX:88.0000:PosY:112.0000:PosZ:0.0000
    //   // [21:55:56.229] StartsCasting 14:4000BB8D:Ifrit:2B5F:Crimson Cyclone:4000BB8D:Ifrit:2.700:113.70:113.70:0.00:-2.36
    //   delaySeconds: 10,
    //   durationSeconds: 5,
    //   promise: async (data) => {
    //     data.combatantData = [];
    //     const hexIds = Object.values(data.bossId);
    //     data.combatantData = (await callOverlayHandler({
    //       call: 'getCombatants',
    //       ids: hexIds.map((x) => parseInt(x, 16)),
    //     })).combatants;
    //   },
    //   alertText: (data, _matches, output) => {
    //     const findBoss = (key) => {
    //       const hexId = data.bossId[key];
    //       if (hexId === undefined)
    //         return undefined;
    //       const decId = parseInt(hexId, 16);
    //       return data.combatantData.find((x) => x.ID === decId);
    //     };
    //     const garuda = findBoss('garuda');
    //     const ifrit = findBoss('ifrit');
    //     const titan = findBoss('titan');
    //     const ultima = findBoss('ultima');
    //     if (
    //       garuda === undefined || ifrit === undefined || titan === undefined || ultima === undefined
    //     )
    //       return;
    //     // Garuda always at +/- 3 from center on an intercardinal.
    //     const garudaDir = Directions.xyTo8DirNum(garuda.PosX, garuda.PosY, centerX, centerY);
    //     if (garudaDir % 2 === 0)
    //       return;
    //     // e.g. Garuda is NW (7), the two safe directions are E (2) and S (4).
    //     let safeDir = [(garudaDir + 3) % 8, (garudaDir + 5) % 8];
    //     // Titan appears slightly offset from a cardinal. Never run out towards Titan.
    //     // TODO: Titan is slightly offset and you could theoretically pick a slightly
    //     // safer cardinal in some cases (I think?) depending on how landslides aim from there.
    //     const titanDir = Directions.xyTo8DirNum(titan.PosX, titan.PosY, centerX, centerY);
    //     safeDir = safeDir.filter((x) => x !== titanDir);
    //     // Ultima appears on an intercardinal. If Ultima is adjacent to only one of the safe spots,
    //     // then pick the other safe spot because it will have more safe directions to run 2nd.
    //     const ultimaDir = Directions.xyTo8DirNum(ultima.PosX, ultima.PosY, centerX, centerY);
    //     const notAdjacentToUltima = safeDir.filter((x) => {
    //       const isAdjacentToUltima = x === (ultimaDir + 1) % 8 || ultimaDir === (x + 1) % 8;
    //       return !isAdjacentToUltima;
    //     });
    //     // If there's at least one cardinal not next to Ultima, pick one of those.
    //     if (notAdjacentToUltima.length !== 0)
    //       safeDir = safeDir.filter((x) => notAdjacentToUltima.includes(x));
    //     // Ifrit always is on an intercard and dashes through it.
    //     const ifritDir = Directions.xyTo8DirNum(ifrit.PosX, ifrit.PosY, centerX, centerY);
    //     const dirStrMap = {
    //       0: output.dirN(),
    //       2: output.dirE(),
    //       4: output.dirS(),
    //       6: output.dirW(),
    //     };
    //     // (1) Do any of our safe spots have an early safe spot where you could
    //     // go stand on the wall immediately?
    //     for (const dir of safeDir) {
    //       for (const run of [-1, 1]) {
    //         const final = (dir + run + 8) % 8;
    //         if (final === ultimaDir)
    //           continue;
    //         // Will Ifrit dash through this or the opposite side?
    //         if (final % 4 === ifritDir % 4)
    //           continue;
    //         const rotation = run === -1 ? output.counterclockwise() : output.clockwise();
    //         return output.early({ dir: dirStrMap[dir], rotation: rotation });
    //       }
    //     }
    //     // (2) Are any safe spots opposite of Garuda (and not by Ultima)?
    //     const garudaOpposite = (garudaDir + 4) % 8;
    //     for (const dir of safeDir) {
    //       for (const run of [-1, 1]) {
    //         const final = (dir + run + 8) % 8;
    //         if (final === ultimaDir)
    //           continue;
    //         if (final !== garudaOpposite)
    //           continue;
    //         const rotation = run === -1 ? output.counterclockwise() : output.clockwise();
    //         return output.normal({ dir: dirStrMap[dir], rotation: rotation });
    //       }
    //     }
    //     // (3) Otherwise, just pick any safe spot and direction away from Ultima.
    //     for (const dir of safeDir) {
    //       for (const run of [-1, 1]) {
    //         // If both directions were safe from Ultima, we would have found an early spot,
    //         // since one of them would be safe from Ifrit as well. So, not possible to
    //         // say "either direction" here, so just pick the first safe direction.
    //         const final = (dir + run + 8) % 8;
    //         if (final === ultimaDir)
    //           continue;
    //         const rotation = run === -1 ? output.counterclockwise() : output.clockwise();
    //         return output.normal({ dir: dirStrMap[dir], rotation: rotation });
    //       }
    //     }
    //   },
    //   outputStrings: {
    //     early: {
    //       en: '${dir} => ${rotation} (early safe)',
    //       de: '${dir} => ${rotation} (früh sicher)',
    //       cn: '${dir} => ${rotation} (提前安全)',
    //       ko: '${dir} => ${rotation} (안전)',
    //     },
    //     normal: {
    //       en: '${dir} => ${rotation}',
    //       de: '${dir} => ${rotation}',
    //       cn: '${dir} => ${rotation}',
    //       ko: '${dir} => ${rotation}',
    //     },
    //     clockwise: Outputs.clockwise,
    //     counterclockwise: Outputs.counterclockwise,
    //     dirN: Outputs.dirN,
    //     dirE: Outputs.dirE,
    //     dirS: Outputs.dirS,
    //     dirW: Outputs.dirW,
    //   },
    // },
    
    
  ],
  
});
