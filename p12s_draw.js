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
  0:4,
  1:5,
  2:6,
  3:7,
  4:0,
  5:1,
  6:2,
  7:3,  
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





const centerX = 100;
const centerY = 100;
const distSqr = (a, b) => {
  const dX = parseFloat(a.x) - parseFloat(b.x);
  const dY = parseFloat(a.y) - parseFloat(b.y);
  return dX * dX + dY * dY;
};
const wings = {
  // vfx/lockon/eff/m0829_cst19_9s_c0v.avfx
  topLeftFirst: '01A5',
  // vfx/lockon/eff/m0829_cst20_9s_c0v.avfx
  topRightFirst: '01A6',
  // vfx/lockon/eff/m0829_cst21_6s_c0v.avfx
  middleLeftSecond: '01A7',
  // vfx/lockon/eff/m0829_cst22_6s_c0v.avfx
  middleRightSecond: '01A8',
  // vfx/lockon/eff/m0829_cst23_9s_c0v.avfx
  bottomLeftFirst: '01A9',
  // vfx/lockon/eff/m0829_cst24_9s_c0v.avfx
  bottomRightFirst: '01AA',
  // vfx/lockon/eff/m0829_cst19_3s_c0v.avfx
  topLeftThird: '01AF',
  // vfx/lockon/eff/m0829_cst20_3s_c0v.avfx
  topRightThird: '01B0',
  // vfx/lockon/eff/m0829_cst22_6s_c0v.avfx
  bottomLeftThird: '01B1',
  // vfx/lockon/eff/m0829_cst23_3s_c0v.avfx
  bottomRightThird: '01B2', // 82E5 damage
};
const superchainNpcNameId = '12377';
const superchainNpcBaseIdMap = {
  destination: '16176',//结束点
  out: '16177',//钢铁
  in: '16178',//月环
  protean: '16179',//八方
  partners: '16180',//四方
};
const engravementLabelMapAsConst = {
  DF8: 'lightTilt',
  DF9: 'darkTilt',
  DFB: 'lightTower',
  DFC: 'darkTower',
  DFD: 'lightBeam',
  DFE: 'darkBeam',
  DFF: 'crossMarked',
  E00: 'xMarked',
};
const engravementLabelMap = engravementLabelMapAsConst;
const engravementIdMap = Object.fromEntries(
  Object.entries(engravementLabelMap).map(([k, v]) => [v, k]),
);
const engravementBeamIds = [
  engravementIdMap.lightBeam,
  engravementIdMap.darkBeam,
];
const engravementTowerIds = [
  engravementIdMap.lightTower,
  engravementIdMap.darkTower,
];
const engravementTiltIds = [
  engravementIdMap.lightTilt,
  engravementIdMap.darkTilt,
];
const engravement3TheosSoulIds = [
  engravementIdMap.crossMarked,
  engravementIdMap.xMarked,
];
const anthroposTetherMap = {
  '00E9': 'light',
  '00EA': 'dark',
  '00FA': 'light',
  '00FB': 'dark', // adequately stretched
};
const tetherAbilityToTowerMap = {
  '82F1': 'lightTower',
  '82F2': 'darkTower',
};
const headmarkers = {
  ...wings,
  // vfx/lockon/eff/tank_laser_5sec_lockon_c0a1.avfx
  glaukopis: '01D7',
  // vfx/lockon/eff/sph_lockon2_num01_s8p.avfx (through sph_lockon2_num04_s8p)
  limitCut1: '0150',
  limitCut2: '0151',
  limitCut3: '0152',
  limitCut4: '0153',
  // vfx/lockon/eff/sph_lockon2_num05_s8t.avfx (through sph_lockon2_num08_s8t)
  limitCut5: '01B5',
  limitCut6: '01B6',
  limitCut7: '01B7',
  limitCut8: '01B8',
  // vfx/lockon/eff/tank_lockonae_0m_5s_01t.avfx
  palladianGrasp: '01D4',
  // vfx/lockon/eff/m0376trg_fire3_a0p.avfx
  chains: '0061',
  // vfx/lockon/eff/lockon3_t0h.avfx
  geocentrismSpread: '0016',
  // vfx/lockon/eff/lockon_en_01v.avfx
  playstationCircle: '016F',
  // vfx/lockon/eff/lockon_sitasankaku_01v.avfx
  playstationTriangle: '0170',
  // vfx/lockon/eff/lockon_sikaku_01v.avfx
  playstationSquare: '0171',
  // vfx/lockon/eff/lockon_batu_01v.avfx
  playstationCross: '0172',
  // vfx/lockon/eff/m0124trg_a4c.avfx
  caloric1Beacon: '012F',
  // vfx/lockon/eff/lockon8_line_1v.avfx
  caloric2InitialFire: '01D6',
  // vfx/lockon/eff/d1014trg_8s_0v.avfx
  caloric2Wind: '01D5',
};
const limitCutMap = {
  [headmarkers.limitCut1]: 1,
  [headmarkers.limitCut2]: 2,
  [headmarkers.limitCut3]: 3,
  [headmarkers.limitCut4]: 4,
  [headmarkers.limitCut5]: 5,
  [headmarkers.limitCut6]: 6,
  [headmarkers.limitCut7]: 7,
  [headmarkers.limitCut8]: 8,
};
const limitCutIds = Object.keys(limitCutMap);
const wingIds = Object.values(wings);
const superchainNpcBaseIds = Object.values(superchainNpcBaseIdMap);
const whiteFlameDelayOutputStrings = {
  delay1: {
    en: 'now',
    de: 'jetzt',
    cn: '现在!',
    ko: '바로',
  },
  delay2: {
    en: 'soon',
    de: 'bald',
    cn: '等1只小怪',
    ko: '1번째 쫄',
  },
  delay3: {
    en: 'delayed',
    de: 'verzögert',
    cn: '等2只小怪',
    ko: '2번째 쫄',
  },
  delay4: {
    en: 'very delayed',
    de: 'sehr verzögert',
    cn: '等3只小怪',
    ko: '3번째 쫄',
  },
  delay5: {
    en: 'verrry delayed',
    de: 'seeeeehr verzögert',
    cn: '等4只小怪',
    ko: '4번째 쫄',
  },
};
const conceptPairMap = {
  [headmarkers.playstationCircle]: 'circle',
  [headmarkers.playstationTriangle]: 'triangle',
  [headmarkers.playstationSquare]: 'square',
  [headmarkers.playstationCross]: 'cross',
};
const conceptDebuffIds = {
  DE8: 'alpha',
  DE9: 'beta',
};
const conceptDebuffToColor = {
  alpha: 'red',
  beta: 'yellow',
};
const npcBaseIdToConceptColor = {
  16183: 'red',
  16184: 'blue',
  16185: 'yellow',
};
const conceptDebuffEffectIds = Object.keys(conceptDebuffIds);
const conceptNpcBaseIds = Object.keys(npcBaseIdToConceptColor);
const conceptPairIds = Object.keys(conceptPairMap);
// The below functions assign a numerical value to all (shapes) and intercept points:
// xy: 88       96       104       112
// 84  (0)--5--(10)--15--(20)--25--(30)
//      |        |         |         |
//      1       11        21        31
//      |        |         |         |
// 92  (2)--7--(12)--17--(22)--27--(32)
//      |        |         |         |
//      3       13        23        33
//      |        |         |         |
// 100 (4)--9--(14)--19--(24)--29--(34)
const conceptLocationMap = {
  north: [0, 10, 20, 30],
  middle: [2, 12, 22, 32],
  south: [4, 14, 24, 34],
};
const getConceptLocation = (concept) => {
  const x = parseFloat(concept.x);
  const y = parseFloat(concept.y);
  let row;
  if (y < 88)
    row = 'north';
  else
    row = y > 96 ? 'south' : 'middle';
  let col;
  if (x < 92)
    col = 0;
  else if (x > 108)
    col = 3;
  else
    col = x > 100 ? 2 : 1;
  return conceptLocationMap[row][col];
};
const getConceptMap = (startLoc) => {
  // takes a concept location and returns an array containing pairs of [adjacentLocation, interceptLocation]
  const conceptMap = [];
  const expectedLocs = [
    ...conceptLocationMap.north,
    ...conceptLocationMap.middle,
    ...conceptLocationMap.south,
  ];
  const [n, e, s, w] = [startLoc - 2, startLoc + 10, startLoc + 2, startLoc - 10];
  if (expectedLocs.includes(n))
    conceptMap.push([n, n + 1]);
  if (expectedLocs.includes(e))
    conceptMap.push([e, e - 5]);
  if (expectedLocs.includes(s))
    conceptMap.push([s, s - 1]);
  if (expectedLocs.includes(w))
    conceptMap.push([w, w + 5]);
  return conceptMap;
};
const pangenesisEffects = {
  stableSystem: 'E22',
  unstableFactor: 'E09',
  lightTilt: 'DF8',
  darkTilt: 'DF9',
};
const pangenesisEffectIds = Object.values(pangenesisEffects);
const getHeadmarkerId = (data, matches) => {
  if (data.decOffset === undefined) {
    if (data.expectedFirstHeadmarker === undefined) {
      console.error('missing expected first headmarker');
      return 'OOPS';
    }
    data.decOffset = parseInt(matches.id, 16) - parseInt(data.expectedFirstHeadmarker, 16);
  }
  return (parseInt(matches.id, 16) - data.decOffset).toString(16).toUpperCase().padStart(4, '0');
};
Options.Triggers.push({
  id: 'AnabaseiosTheTwelfthCircleSavage_Draw',
  zoneId: ZoneId.AnabaseiosTheTwelfthCircleSavage,
  config: [
    {
      id: "P12s_截线标记",
      name: { en: "P12s_本体截线标记" },
      type: "checkbox",
      default: false,
    },
  ],
  initData: () => {
    return {
      isDoorBoss: true,
      combatantData: [],
      paradeigmaCounter: 0,
      glaukopisSecondHitSame: false,
      engravementCounter: 0,
      engravement1BeamsPosMap: new Map(),
      engravement1TetherIds: [],
      engravement1TetherPlayers: {},
      engravement1LightBeamsPos: [],
      engravement1DarkBeamsPos: [],
      engravement1Towers: [],
      engravement3TowerPlayers: [],
      engravement3TetherPlayers: {},
      wingCollect: [],
      wingCalls: [],
      superchainCollect: [],
      lcCombatants: [],
      lcCombatantsOffset: 0,
      whiteFlameCounter: 0,
      sampleTiles: [],
      darknessClones: [],
      conceptData: {},
      pangenesisRole: {},
      pangenesisTowerCount: 0,
      gaiaochosCounter: 0,
      classicalCounter: 0,
      classicalMarker: {},
      classicalAlphaBeta: {},
      caloricCounter: 0,
      caloric1First: [],
      caloric1Buff: {},
      caloric2PassCount: 0,
      gaiaochosTetherCollect: [],
      seenSecondTethers: false,




      灵魂刻印计数:0,
      灵魂刻印线:[],
    };
  },
  triggers: [
    // 分P 1
    {
      id: 'P12S 分P 1',
      type: 'StartsUsing',
      netRegex: { id: ['82DA', '82F5', '86FA', '86FB']},
      run: (data, matches) => {
        
        const phaseMap = {
          '82DA': 'superchain1',
          '82F5': 'palladion',//麻将
          '86FA': 'superchain2a',
          '86FB': 'superchain2b',
        };
        data.phase = phaseMap[matches.id];
        data.超链单位Set=new Set();
        data.超链单位=[];
      },
    },
    // 分P 2
    {
      id: 'P12S 分P 2',
      type: 'StartsUsing',
      // 8682 = Ultima cast
      netRegex: { id: '8682'},
      run: (data) => {
        data.isDoorBoss = false;
        data.expectedFirstHeadmarker = headmarkers.palladianGrasp;
      },
    },
    // 分P 3
    {
      id: 'P12S 分P 3',
      type: 'StartsUsing',
      netRegex: { id: ['8326', '8331', '8338', '833F']},
      run: (data, matches) => {
        switch (matches.id) {
          case '8326':
            data.phase = data.gaiaochosCounter === 0 ? 'gaiaochos1' : 'gaiaochos2';
            data.gaiaochosCounter++;
            break;
          case '8331':
            data.phase = data.classicalCounter === 0 ? 'classical1' : 'classical2';
            data.classicalCounter++;
            break;
          case '8338':
            data.phase = 'caloric';
            data.caloricCounter++;
            break;
          case '833F':
            data.phase = 'pangenesis';
            break;
        }
      },
    },
    // 门神头顶点名解析
    {
      id: 'P12S 门神头顶点名解析',
      type: 'StartsUsing',
      netRegex: { id: ['82E7', '82E8']},
      suppressSeconds: 99999,
      run: (data, matches) => {
        // The first headmarker in the door boss is EITHER the bottom left or bottom right wing.
        const isBottomLeft = matches.id === '82E8';
        const first = isBottomLeft ? headmarkers.bottomLeftFirst : headmarkers.bottomRightFirst;
        data.expectedFirstHeadmarker = first;
      },
    },
    // --------------------- Phase 1 ------------------------
    
   
    //门神小怪射线
    {
      id: 'P12S 门神小怪射线',
      type: 'StartsUsing',
      netRegex: { id: '82EE'},
      run: (data, matches) => {
        if (data.phase === 'superchain2b') {
          var delay=2.5;
        }else{
          var delay=0;
        }
        postAoe(`{"Name":"P12S 门神小怪射线","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":60.0,"Width":10.0,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":${delay},"During":${5-delay}}`)
      },
    },

    //门神翅膀开始方向收集
    {
      id: 'P12S 门神翅膀开始方向收集',
      type: 'StartsUsing',
      netRegex: { id: ['82E7', '82E8', '82E1', '82E2']},
      run: (data, matches) => {
        data.翅膀读条=matches;
        // The first headmarker in the door boss is EITHER the bottom left or bottom right wing.
        
      },
    },
    // 翅膀作图
    {
      id: 'P12S 翅膀aoe',
      type: 'HeadMarker',
      netRegex: {},
      run: async (data, matches) => {

        //每个翅膀2.6s 第一次读条开始10s
        const id = getHeadmarkerId(data, matches);

        if (!wingIds.includes(id)) return false;
        var bottomFirst = data.翅膀读条.id === '82E8'|| data.翅膀读条.id === '82E7';

        var c = (await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(data.翅膀读条.sourceId, 16)],
        })).combatants;


        var rot=parseFloat(c[0].Heading)/Math.PI*-180;

        if (id==wings.topLeftFirst) {
          postAoe(`{"Name":"翅膀 上左1","AoeType":"Sector","CentreType":"PostionValue","CentreValue":{"X":${c[0].PosX},"Y":0,"Z":${c[0].PosY}},"Radius":60,"Angle":180,"Rotation":${rot-90},"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":9}`)
        }
        if (id==wings.topRightFirst) {
          postAoe(`{"Name":"翅膀 上右1","AoeType":"Sector","CentreType":"PostionValue","CentreValue":{"X":${c[0].PosX},"Y":0,"Z":${c[0].PosY}},"Radius":60,"Angle":180,"Rotation":${rot+90},"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":9}`)
        }
        if (id==wings.bottomLeftFirst) {
          postAoe(`{"Name":"翅膀 下左1","AoeType":"Sector","CentreType":"PostionValue","CentreValue":{"X":${c[0].PosX},"Y":0,"Z":${c[0].PosY}},"Radius":60,"Angle":180,"Rotation":${rot-90},"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":9}`)
        }
        if (id==wings.bottomRightFirst) {
          postAoe(`{"Name":"翅膀 下右1","AoeType":"Sector","CentreType":"PostionValue","CentreValue":{"X":${c[0].PosX},"Y":0,"Z":${c[0].PosY}},"Radius":60,"Angle":180,"Rotation":${rot+90},"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":9}`)
        }

        if (!bottomFirst) {
          if (id==wings.middleLeftSecond) {
            postAoe(`{"Name":"翅膀 上 中左","AoeType":"Sector","CentreType":"PostionValue","CentreValue":{"X":${c[0].PosX},"Y":0,"Z":${c[0].PosY}},"Radius":60,"Angle":180,"Rotation":${rot-90},"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":6,"During":2.6}`);
          }
          if (id==wings.middleRightSecond) {
            // postAoe(`{"Name":"翅膀 上 中右","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":${c[0].PosX},"Y":0,"Z":${c[0].PosY}},"Length":20,"Width":40,"Rotation":${rot+90},"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":6,"During":2.6}`)
            postAoe(`{"Name":"翅膀 上 中右","AoeType":"Sector","CentreType":"PostionValue","CentreValue":{"X":${c[0].PosX},"Y":0,"Z":${c[0].PosY}},"Radius":60,"Angle":180,"Rotation":${rot+90},"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":6,"During":2.6}`);
          }
        }else{
          if (id==wings.middleLeftSecond) {
            postAoe(`{"Name":"翅膀 上 中左","AoeType":"Sector","CentreType":"PostionValue","CentreValue":{"X":${c[0].PosX},"Y":0,"Z":${c[0].PosY}},"Radius":60,"Angle":180,"Rotation":${rot+90},"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":6,"During":2.6}`);
          }
          if (id==wings.middleRightSecond) {
            postAoe(`{"Name":"翅膀 上 中右","AoeType":"Sector","CentreType":"PostionValue","CentreValue":{"X":${c[0].PosX},"Y":0,"Z":${c[0].PosY}},"Radius":60,"Angle":180,"Rotation":${rot-90},"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":6,"During":2.6}`);
          }
        }

        if (id==wings.topLeftThird) {
          postAoe(`{"Name":"翅膀 上左3","AoeType":"Sector","CentreType":"PostionValue","CentreValue":{"X":${c[0].PosX},"Y":0,"Z":${c[0].PosY}},"Radius":60,"Angle":180,"Rotation":${rot-90},"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":5.6,"During":2.6}`)
        }
        if (id==wings.topRightThird) {
          postAoe(`{"Name":"翅膀 上右3","AoeType":"Sector","CentreType":"PostionValue","CentreValue":{"X":${c[0].PosX},"Y":0,"Z":${c[0].PosY}},"Radius":60,"Angle":180,"Rotation":${rot+90},"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":5.6,"During":2.6}`)
        }
        if (id==wings.bottomLeftThird) {
          postAoe(`{"Name":"翅膀 下左3","AoeType":"Sector","CentreType":"PostionValue","CentreValue":{"X":${c[0].PosX},"Y":0,"Z":${c[0].PosY}},"Radius":60,"Angle":180,"Rotation":${rot-90},"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":5.6,"During":2.6}`)
        }
        if (id==wings.bottomRightThird) {
          postAoe(`{"Name":"翅膀 下右3","AoeType":"Sector","CentreType":"PostionValue","CentreValue":{"X":${c[0].PosX},"Y":0,"Z":${c[0].PosY}},"Radius":60,"Angle":180,"Rotation":${rot+90},"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":5.6,"During":2.6}`)
        }

      },
    },

    {
      id: 'P12S 门神开场小怪站位',
      type: 'Ability',
      netRegex: { id: '8314'},
      suppressSeconds: 99999,
      delaySeconds:0.5,
      run: async (data, matches) => {
        var [c] = (await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        })).combatants;
        if(parseFloat(c.PosY)>100) var dy=1; else var dy=-1;
        var p1={"X":100,"Y":0,"Z":100+dy*0};
        var p2={"X":100,"Y":0,"Z":100+dy*5};
        var p3={"X":100,"Y":0,"Z":100+dy*10};
        var p4={"X":100,"Y":0,"Z":100+dy*15};
        var ps={"X":100,"Y":0,"Z":100+dy*-10};

        // 12s 5s
        if (data.PartyIds.indexOf(data.myId)==0) {
          var epos1=p2;
          var epos2=ps;
        }
        if (data.PartyIds.indexOf(data.myId)==2) {
          var epos1=p1;
          var epos2=ps;
        }
        if (data.PartyIds.indexOf(data.myId)==4) {
          var epos1=p3;
          var epos2=ps;
        }
        if (data.PartyIds.indexOf(data.myId)==6) {
          var epos1=p4;
          var epos2=ps;
        }

        if (data.PartyIds.indexOf(data.myId)==1) {
          var epos1=ps;
          var epos2=p2;
        }
        if (data.PartyIds.indexOf(data.myId)==3) {
          var epos1=ps;
          var epos2=p1;
        }
        if (data.PartyIds.indexOf(data.myId)==5) {
          var epos1=ps;
          var epos2=p3;
        }
        if (data.PartyIds.indexOf(data.myId)==7) {
          var epos1=ps;
          var epos2=p4;
        }

      postAoe(`{"Name":"门神开场小怪站位 第一轮","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":${JSON.stringify(epos1)},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":11.5}`);
      postAoe(`{"Name":"门神开场小怪站位 第二轮","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":${JSON.stringify(epos2)},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":11.5,"During":5}`);
      

      },
    },

    
    //明眸 t死刑
    {
      id: 'P12S 明眸 t死刑 1段',
      type: 'StartsUsing',
      netRegex: { id: '82FC'},
      run: (data, matches, output) => {
        postAoe(`{"Name":"明眸 t死刑 1段","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Length":60,"Width":5.0,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":5}`);
      },
    },
    {
      id: 'P12S 明眸 t死刑 2段',
      type: 'Ability',
      netRegex: { id: '82FC'},
      run: async (data, matches, output) => {
        var [c] = (await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        })).combatants;
        postAoe(`{"Name":"明眸 t死刑 2段","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":${c.TargetID},"Length":60,"Width":5.0,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":3}`);
      },
    },

    // 远/近 距离接触
    {
      id: 'P12S Peridialogos',
      type: 'StartsUsing',
      netRegex: { id: ['82FE','82FF']},
      run: (data, matches) =>
        {
          if (matches.id=='82FF') {
            postAoe(`{"Name":"近死刑","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"Nearest","TrackValue":1,"Radius":6.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":5.2}`);
            postAoe(`{"Name":"远分摊","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"Farest","TrackValue":1,"Radius":6.0,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":6.2}`);
          }
          if (matches.id=='82FE') {
            postAoe(`{"Name":"近分摊","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"Nearest","TrackValue":1,"Radius":6.0,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":6.2}`);
            postAoe(`{"Name":"远死刑","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"Farest","TrackValue":1,"Radius":6.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":5.2}`);
          }
        },
    },

    //灵魂刻印计数器 黑白拉线踩塔
    {
      id: 'P12S 灵魂刻印计数器',
      type: 'Ability',
      netRegex: { id: '8305'},
      run: (data, matches) =>{
        data.灵魂刻印线=[];
        data.灵魂刻印线读条=[];
        data.灵魂刻印自己='Nan';
        data.灵魂刻印塔buffer=undefined;
        data.bossId=matches.sourceId;

        ++data.灵魂刻印计数;
      } 
    },
    // 灵魂刻印 放塔aoe
    {
      id: 'P12S 灵魂刻印 放塔aoe',
      type: 'GainsEffect',
      netRegex: { effectId: ['DFB','DFC'] },
      run: (data, matches) => {
        var dur=parseFloat(matches.duration);
        if (parseInt(matches.targetId,16)==data.myId) {
          var col=data.triggerSetConfig.SafeAoeCol;
        }else{
          var col=data.triggerSetConfig.DangerAoeCol;
        }
        postAoe(`{"Name":"灵魂刻印 放塔aoe","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":3,"Color":${col},"Delay":${dur-3},"During":3}`)
      },
    },
    // In Engravement 1 (Paradeigma 2), 2 players receive lightTower and 2 players receive darkTower,
    // 2 players need to guide the light beam and 2 players need to guide the dark beam.
    // The operator of the beam extends the beam directly from the outside. The beam is attenuated until the jagged line disappears.
    // The people in the tower find the people who have the opposite attribute to the debuff and put them in four places.
    // At NE NW SE SW as a # shape. The position of outside Anthropos is fixed by two situation.
    // {[97, 75], [125, 97], [103, 125], [75, 103]} and {[103, 75], [125, 103], [97, 125], [75, 97]}. The Anthropos will cast
    // 'Searing Radiance' for light beam and 'Shadowsear' for dark beam. We use those as a trigger for Tower players place
    // the Tower.
    // When debuffs expire and towers drop, their debuff changes to lightTilt or darkTilt (same as tower color).
    // At the same time the towers drop, the 4 tethered players receive lightTilt or darkTilt depending on their tether color.
    //

    // 灵魂刻印黑白连线
    {
      id: 'P12S 灵魂刻印1 黑白连线 收集',
      type: 'Tether',
      netRegex: { id: Object.keys(anthroposTetherMap)},
      run: (data, matches) => {
        data.灵魂刻印线.push(matches);
      },
    },
    // 灵魂刻印1 黑白连线 拉线位置
    {
      id: 'P12S 灵魂刻印1 黑白连线 拉线位置',
      type: 'StartsUsing',
      netRegex: { id: ['82F1', '82F2']},
      condition:(data) => data.灵魂刻印计数==1,
      run: (data, matches) => {
        
       
        var x=parseFloat(matches.x);
        var y=parseFloat(matches.y);
       
        if (parseInt(matches.targetId,16)==data.myId) {
          var ex = Math.abs(x - 100) > 5 ? 100-(x-100)*0.5 : x;
          var ey = Math.abs(y - 100) > 5 ? 100-(y-100)*0.5 : y;
          postAoe(`{"Name":"灵魂刻印1 黑白连线 拉线位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":{"X":${ex},"Y":0,"Z":${ey}},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":10}`)
        }
        

        if (parseInt(matches.targetId,16)==data.myId){
          if (matches.id=='82F1') {
            data.灵魂刻印自己='光线';
          }
          if (matches.id=='82F2') {
            data.灵魂刻印自己='暗线';
          }
          
        }
        
        const matchedPositionTo4Dir = (x,y) => {
          // Positions are moved up 100 and right 100
          y =y - 100;
          x = x - 100;
          // During Sigma, Omega-M teleports to one of the 8 cardinals + numerical
          // slop on a radius=20 circle.
          // N = (100, 80), E = (120, 100), S = (100, 120), W = (80, 100)
          // NE = (114.14, 85.86), SE = (114.14, 114.14), SW = (85.86, 114.14), NW = (85.86, 85.86)
          //
          // Map NW = 0, N = 1, ..., W = 7
          return Math.round(2 - 2 * Math.atan2(x, y) / Math.PI) % 4;
        };
        var rNew=matchedPositionTo4Dir(x,y);
        if (matches.id == '82F1') {
          // 光
          if (data.灵魂刻印线读条[0] === undefined) {
            data.灵魂刻印线读条[0] = matches;
          } else {
            var rOld = matchedPositionTo4Dir(parseFloat(data.灵魂刻印线读条[0].x), parseFloat(data.灵魂刻印线读条[0].y));
            if (rNew < rOld) {
              data.灵魂刻印线读条[1] = data.灵魂刻印线读条[0];
              data.灵魂刻印线读条[0] = matches;
            } else {
              data.灵魂刻印线读条[1] = matches;
            }
          }
        } else {
          // 暗
          if (data.灵魂刻印线读条[2] === undefined) {
            data.灵魂刻印线读条[2] = matches;
          } else {
            var rOld = matchedPositionTo4Dir(parseFloat(data.灵魂刻印线读条[2].x), parseFloat(data.灵魂刻印线读条[2].y));
            if (rNew < rOld) {
              data.灵魂刻印线读条[3] = data.灵魂刻印线读条[2];
              data.灵魂刻印线读条[2] = matches;
            } else {
              data.灵魂刻印线读条[3] = matches;
            }
          }
        }


      },
    },
    // 灵魂刻印1 黑白连线 范围
    {
      id: 'P12S 灵魂刻印1 黑白连线 范围',
      type: 'StartsUsing',
      netRegex: { id: ['82F1', '82F2']},
      condition:(data) => data.灵魂刻印计数==1,
      run: (data, matches) => {
         postAoe(`{"Name":"灵魂刻印1 黑白连线 范围","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Length":60,"Width":6.0,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":6,"During":3}`);

      },
    },
    //灵魂刻印1 放塔位置
    {
      id: 'P12S 灵魂刻印1 放塔位置',
      type: 'GainsEffect',
      netRegex: { effectId: ['DFB','DFC'] },
      condition: (data) => data.灵魂刻印计数==1,
      delaySeconds:0.5,
      run: (data, matches) => {
        if (parseInt(matches.targetId,16)!=data.myId) return;

        let x=100;
        let y=100;

        if (matches.effectId=='DFB') {
          //光
          if (data.role=='dps') {
            // console.log(JSON.stringify(data.灵魂刻印线读条[3]));
            x= parseFloat(data.灵魂刻印线读条[3].x);
            y= parseFloat(data.灵魂刻印线读条[3].y);
          }else
          {
            x= parseFloat(data.灵魂刻印线读条[2].x);
            y= parseFloat(data.灵魂刻印线读条[2].y);
          }
        }else{
          // 暗
          if (data.role=='dps') {
            x= parseFloat(data.灵魂刻印线读条[1].x);
            y= parseFloat(data.灵魂刻印线读条[1].y);
          }else
          {
            x= parseFloat(data.灵魂刻印线读条[0].x);
            y= parseFloat(data.灵魂刻印线读条[0].y);
          }
        }
        var ex = Math.abs(x - 100) > 5 ? 100-(x-100)*0.4 : 100+(x-100)/3*10;
        var ey = Math.abs(y - 100) > 5 ? 100-(y-100)*0.4 : 100+(y-100)/3*10;
        postAoe(`{"Name":"灵魂刻印1 放塔位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":{"X":${ex},"Y":0,"Z":${ey}},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":9.5}`);
        
        
      },
    },
    
    // 灵魂刻印1 踩塔位置
    {
      id: 'P12S 灵魂刻印1 踩塔位置',
      type: 'Ability',
      netRegex: { id: ['830C','830D']},
      condition: (data) => data.灵魂刻印计数==1,
      run: async (data, matches) =>{
        if (data.灵魂刻印自己=='Nan') return;
        if (matches.id=='830C' && data.灵魂刻印自己=='光线') return;
        if (matches.id=='830D' && data.灵魂刻印自己=='暗线') return;

        if (data.灵魂刻印塔buffer===undefined) {
          data.灵魂刻印塔buffer=matches;
        }else{
          var c1 = (await callOverlayHandler({
            call: 'getCombatants',
            ids: [parseInt(matches.sourceId, 16)],
          })).combatants;
          var c2 = (await callOverlayHandler({
            call: 'getCombatants',
            ids: [parseInt(data.灵魂刻印塔buffer.sourceId, 16)],
          })).combatants;
          var m = (await callOverlayHandler({
            call: 'getCombatants',
            ids: [data.myId],
          })).combatants;
          
          let dis1=Math.hypot((c1[0].PosX-m[0].PosX),(c1[0].PosY-m[0].PosY));
          let dis2=Math.hypot((c2[0].PosX-m[0].PosX),(c2[0].PosY-m[0].PosY));
          if(dis1<dis2){
            postAoe(`{"Name":"灵魂刻印1 踩塔位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"ActorId","DestinationValue":0x${matches.sourceId},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":3}`);
            postAoe(`{"Name":"灵魂刻印1 踩塔aoe","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":3,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":3}`);
          }else{
            postAoe(`{"Name":"灵魂刻印1 踩塔位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"ActorId","DestinationValue":0x${data.灵魂刻印塔buffer.sourceId},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":3}`);
            postAoe(`{"Name":"灵魂刻印1 踩塔aoe","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${data.灵魂刻印塔buffer.sourceId},"Radius":3,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":3}`);
          }
        }
        
      } 
    },




    // 灵魂刻印2 buff收集器
    {
      id: 'P12S 灵魂刻印2 buff收集器',
      type: 'GainsEffect',
      netRegex: {effectId: ['DF8','DF9','DFB','DFC','DFD','DFE']},
      condition: (data, matches) => data.灵魂刻印计数==2,
      run: (data, matches) => {
        const eMap = {
          DF8: '光',
          DF9: '暗',
          DFB: '光塔',
          DFC: '暗塔',
          DFD: '光直线分摊',
          DFE: '暗直线分摊',
        };
        if (data.me==matches.target) {
          data.灵魂刻印自己=eMap[matches.effectId];
        }
        if (eMap[matches.effectId]=='光直线分摊') data.灵魂刻印2光分摊=parseInt(matches.targetId,16);
        if (eMap[matches.effectId]=='暗直线分摊') data.灵魂刻印2暗分摊=parseInt(matches.targetId,16);
        if (eMap[matches.effectId]=='光塔') data.灵魂刻印2光塔=parseInt(matches.targetId,16);
        if (eMap[matches.effectId]=='暗塔') data.灵魂刻印2暗塔=parseInt(matches.targetId,16);
      },
    },
    // 灵魂刻印2 分摊处理器
    {
      id: 'P12S 灵魂刻印2 分摊处理器',
      type: 'GainsEffect',
      netRegex: {effectId: ['DFD','DFE']},
      condition: (data, matches) => data.灵魂刻印计数==2,
      delaySeconds:1,
      run: (data, matches) => {
        const eMap = {
          DF8: '光',
          DF9: '暗',
          DFB: '光塔',
          DFC: '暗塔',
          DFD: '光直线分摊',
          DFE: '暗直线分摊',
        };
        if ((eMap[matches.effectId] == '光直线分摊') != ((data.灵魂刻印自己 == '光' || data.灵魂刻印自己 == '光塔' || data.灵魂刻印自己 == '暗直线分摊'))) {
          var col = data.triggerSetConfig.SafeAoeCol;
        } else {
          var col = data.triggerSetConfig.DangerAoeCol;
        }
        postAoe(`{"Name":"灵魂刻印2 分摊处理器","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${data.bossId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Length":60,"Width":6.0,"Rotation":0.0,"Color":${col},"Delay":6,"During":4}`);
      },
    },
    {
      id: 'P12S 灵魂刻印2 分摊左右提醒',
      type: 'GainsEffect',
      netRegex: { effectId: ['DFD', 'DFE'] },
      condition: (data, matches) => data.灵魂刻印计数 == 2,
      suppressSeconds:1,
      delaySeconds: 4,
      alertText: (data, matches,output) => {
        const eMap = {
          DF8: '光',
          DF9: '暗',
          DFB: '光塔',
          DFC: '暗塔',
          DFD: '光直线分摊',
          DFE: '暗直线分摊',
        };
        if ((data.灵魂刻印自己 == '光' || data.灵魂刻印自己 == '光塔' || data.灵魂刻印自己 == '暗直线分摊')) {
          return output.left();
        } else {
          return output.right();
        }
      },
      outputStrings: {
        right: {
          cn: '靠右分摊',
        },
        left: {
          cn: '靠左分摊',
        },
      },
    },
    // 灵魂刻印2 踩塔处理器
    {
      id: 'P12S 灵魂刻印2 踩塔处理器',
      type: 'Ability',
      netRegex: { id: ['830C','830D']},
      condition: (data) => data.灵魂刻印计数==2,
      run: async (data, matches) =>{
        if ((matches.id == '830C' && data.灵魂刻印2暗分摊 == data.myId) || (matches.id == '830D' && data.灵魂刻印2光分摊 == data.myId))
        {
          postAoe(`{"Name":"灵魂刻印2 踩塔位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"ActorId","DestinationValue":0x${matches.sourceId},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":3}`);
          postAoe(`{"Name":"灵魂刻印2 踩塔aoe","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":3,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":3}`);
        }else{
          postAoe(`{"Name":"灵魂刻印2 踩塔aoe","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":3,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":3}`);
        }
        
      } 
    },
    // 灵魂刻印 分散aoe
    {
      id: 'P12S 灵魂刻印 分散aoe',
      type: 'GainsEffect',
      netRegex: { effectId: 'DFA' },
      run: (data, matches) => {
        var dur=parseFloat(matches.duration);
        postAoe(`{"Name":"灵魂刻印 放塔aoe","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":6,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":${dur-3},"During":3}`)
      },
    },

    // 灵魂刻印3 地板消失收集器
    {
      id: 'P12S 灵魂刻印3 地板消失收集器',
      type: 'Tether',
      netRegex: { id: '00E8'},
      condition: (data) => data.灵魂刻印计数==3,
      run: async (data, matches) => {
        var c = (await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        })).combatants;
        var x=c[0].PosX;
        var y=c[0].PosY;
        // 90 85
        if(Math.abs(x-90)<1 && Math.abs(y-85)<1){
          data.灵魂刻印3左上地板消失=true;
        }
      },
    },
    // 灵魂刻印3 buff收集器
    {
      id: 'P12S 灵魂刻印3 buff收集器',
      type: 'GainsEffect',
      netRegex: {effectId: ['DF8','DF9','DFB','DFC','DFF','E00']},
      condition: (data, matches) => data.灵魂刻印计数==3,
      run: (data, matches) => {
        const eMap = {
          DF8: '光',
          DF9: '暗',
          DFB: '光塔',
          DFC: '暗塔',
          DFD: '光直线分摊',
          DFE: '暗直线分摊',
          DFF: '十字',
          E00: 'x字',
        };
        if (data.me==matches.target) {
          data.灵魂刻印自己=eMap[matches.effectId];
        }
        if (data.me!=matches.target && (eMap[matches.effectId]=='光塔'||eMap[matches.effectId]=='暗塔')) {
          data.灵魂刻印3塔id=parseInt(matches.targetId,16);
          data.灵魂刻印3塔种类=eMap[matches.effectId];
        }
        
      },
    },
    // 灵魂刻印3 黑白连线 拉线位置
    {
      id: 'P12S 灵魂刻印3 黑白连线 拉线位置',
      type: 'StartsUsing',
      netRegex: { id: ['82F1', '82F2']},
      condition:(data, matches) => data.灵魂刻印计数==3 && data.me === matches.target,
      delaySeconds:1,
      run: (data, matches) => {
        
       
        var x=parseFloat(matches.x);
        var y=parseFloat(matches.y);
        if (data.灵魂刻印3左上地板消失) {
          if (x > 100) {
            if (y < 100) {
              // 右上
              var ePos={"X":90,"Y":0,"Z":97};
              var ePos2={"X":90,"Y":0,"Z":99.5};
              data.灵魂刻印3拉线方式='正';
            } else {
              // 右下
              var ePos={"X":92,"Y":0,"Z":90.5};
              var ePos2={"X":99.5,"Y":0,"Z":90.5};
              data.灵魂刻印3拉线方式='斜';
            }
          } else {
            if (y < 100) {
              // 左上
              var ePos={"X":108,"Y":0,"Z":109.5};
              var ePos2={"X":100.5,"Y":0,"Z":109.5};
              data.灵魂刻印3拉线方式='斜';
            } else {
              // 左下
              var ePos={"X":110,"Y":0,"Z":103};
              var ePos2={"X":110,"Y":0,"Z":100.5};
              data.灵魂刻印3拉线方式='正';
            }
          }
        }else{
          if (x > 100) {
            if (y < 100) {
              // 右上
              var ePos={"X":92,"Y":0,"Z":109.5};
              var ePos2={"X":99.5,"Y":0,"Z":109.5};
              data.灵魂刻印3拉线方式='斜';
            } else {
              // 右下
              var ePos={"X":90,"Y":0,"Z":103};
              var ePos2={"X":90,"Y":0,"Z":100.5};
              data.灵魂刻印3拉线方式='正';
            }
          } else {
            if (y < 100) {
              // 左上
              var ePos={"X":110,"Y":0,"Z":97};
              var ePos2={"X":110,"Y":0,"Z":99.5};
              data.灵魂刻印3拉线方式='正';
            } else {
              // 左下
              var ePos={"X":108,"Y":0,"Z":90.5};
              var ePos2={"X":100.5,"Y":0,"Z":90.5};
              data.灵魂刻印3拉线方式='斜';
            }
          }
        }
        postAoe(`{"Name":"灵魂刻印3 黑白连线 拉线位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":${JSON.stringify(ePos)},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":8}`)
        
        if (parseInt(matches.targetId,16)==data.myId){
          if (matches.id=='82F1') {
            data.灵魂刻印自己='光线';
          }
          if (matches.id=='82F2') {
            data.灵魂刻印自己='暗线';
          }
        }
        if((data.灵魂刻印3塔种类=='光塔' && data.灵魂刻印自己=='光线') || (data.灵魂刻印3塔种类=='暗塔' && data.灵魂刻印自己=='暗线'))
        {
          postAoe(`{"Name":"灵魂刻印3 黑白连线 闲组引导位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":${JSON.stringify(ePos2)},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":8,"During":8}`)
        }
        

        
        
       

      },
    },
    // 灵魂刻印3 黑白连线 左右处理
    {
      id: 'P12S 灵魂刻印3 黑白连线 左右处理',
      type: 'StartsUsing',
      netRegex: { id: '82F1'},
      condition:(data, matches) => data.灵魂刻印计数==3,
      suppressSeconds:1,
      run: (data, matches) => {
        if(parseFloat(matches.x)<100){
          data.灵魂刻印3黑白连线左右='光左暗右';
        }else{
          data.灵魂刻印3黑白连线左右='光右暗左';
        }
      },
    },
    // 灵魂刻印3 黑白连线 范围
    {
      id: 'P12S 灵魂刻印3 黑白连线 范围',
      type: 'StartsUsing',
      netRegex: { id: ['82F1', '82F2']},
      condition:(data) => data.灵魂刻印计数==3,
      run: (data, matches) => {
         postAoe(`{"Name":"灵魂刻印3 黑白连线 范围","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Length":60,"Width":6.0,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":6,"During":3}`);

      },
    },
    // 灵魂刻印3 普通塔处理器
    {
      id: 'P12S 灵魂刻印3 普通塔处理器',
      type: 'Tether',
      netRegex: { id: '00E8'},
      condition: (data) => data.灵魂刻印计数==3,
      delaySeconds:0.2,
      suppressSeconds:1,
      run: async (data, matches) => {
        if(data.灵魂刻印自己=='十字'){
          if (data.灵魂刻印3左上地板消失) {
            postAoe(`{"Name":"灵魂刻印3 十字 左上地板消失 踩塔位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":{"X":116,"Y":0,"Z":85},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":6}`) 
          }
          else{
            postAoe(`{"Name":"灵魂刻印3 十字 右上地板消失 踩塔位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":{"X":84,"Y":0,"Z":85},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":6}`) 
          }
        }
        if(data.灵魂刻印自己=='x字'){
          if (data.灵魂刻印3左上地板消失) {
            postAoe(`{"Name":"灵魂刻印3 x字 左上地板消失 踩塔位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":{"X":84,"Y":0,"Z":115},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":6}`) 
          }
          else{
            postAoe(`{"Name":"灵魂刻印3 x字 右上地板消失 踩塔位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":{"X":116,"Y":0,"Z":115},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":6}`) 
          }
        }
        if(data.灵魂刻印自己=='光塔' ||data.灵魂刻印自己=='暗塔')
        {
          if (data.PartyIds.indexOf(data.myId)<data.PartyIds.indexOf(data.灵魂刻印3塔id)) {
            if (data.灵魂刻印3左上地板消失){
              postAoe(`{"Name":"灵魂刻印3 塔 左上地板消失 高顺位踩塔位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":{"X":84,"Y":0,"Z":95},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":6}`) 
            }else{
              postAoe(`{"Name":"灵魂刻印3 塔 右上地板消失 高顺位踩塔位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":{"X":84,"Y":0,"Z":105},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":6}`) 
            }
          }else{
            if (data.灵魂刻印3左上地板消失){
              postAoe(`{"Name":"灵魂刻印3 塔 左上地板消失 低顺位踩塔位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":{"X":116,"Y":0,"Z":105},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":6}`) 
            }else{
              postAoe(`{"Name":"灵魂刻印3 塔 右上地板消失 低顺位踩塔位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":{"X":116,"Y":0,"Z":95},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":6}`) 
            }
          }
        }
        
      },
    },
    // 灵魂刻印3 光暗塔处理器
    {
      id: 'P12S 灵魂刻印3 光暗塔处理器',
      type: 'Tether',
      netRegex: { id: '00E8'},
      condition: (data) => data.灵魂刻印计数==3 && (data.灵魂刻印自己=='光塔' || data.灵魂刻印自己=='暗塔'),
      delaySeconds:0.2,
      suppressSeconds:1,
      run: async (data, matches) => {
        if (data.PartyIds.indexOf(data.myId) < data.PartyIds.indexOf(data.灵魂刻印3塔id)){
          if (data.灵魂刻印自己=='光塔') {
            if(data.灵魂刻印3黑白连线左右=='光左暗右'){
              //左边 光左 光塔 原地放
              if(data.灵魂刻印3左上地板消失){var ePos={"X":85,"Y":0,"Z":95};}else{var ePos={"X":85,"Y":0,"Z":109};}
            }else{
              //左边 光右 光塔 中间放
              if(data.灵魂刻印3左上地板消失){var ePos={"X":99.5,"Y":0,"Z":99.5};}else{var ePos={"X":99.5,"Y":0,"Z":100.5};}
            }
          }
          else{
            if(data.灵魂刻印3黑白连线左右=='光左暗右'){
              //左边 光左 暗塔 中间放
              if(data.灵魂刻印3左上地板消失){var ePos={"X":99.5,"Y":0,"Z":99.5};}else{var ePos={"X":99.5,"Y":0,"Z":100.5};}
            }else{
              //左边 光右 暗塔 原地放
              if(data.灵魂刻印3左上地板消失){var ePos={"X":85,"Y":0,"Z":95};}else{var ePos={"X":85,"Y":0,"Z":109};}
              
            }
          }
        }else{
          if (data.灵魂刻印自己=='光塔') {
            if(data.灵魂刻印3黑白连线左右=='光左暗右'){
              //右边 光左 光塔 放中间
              if(data.灵魂刻印3左上地板消失){var ePos={"X":100.5,"Y":0,"Z":100.5};}else{var ePos={"X":100.5,"Y":0,"Z":99.5};}
            }else{
              //右边 光右 光塔 原地放
              if(data.灵魂刻印3左上地板消失){var ePos={"X":115,"Y":0,"Z":109};}else{var ePos={"X":115,"Y":0,"Z":95};}
            }
          }
          else{
            if(data.灵魂刻印3黑白连线左右=='光左暗右'){
              //右边 光左 暗塔 原地放
              if(data.灵魂刻印3左上地板消失){var ePos={"X":115,"Y":0,"Z":109};}else{var ePos={"X":115,"Y":0,"Z":95};}
            }else{
              //右边 光右 暗塔 放中间
              if(data.灵魂刻印3左上地板消失){var ePos={"X":100.5,"Y":0,"Z":100.5};}else{var ePos={"X":100.5,"Y":0,"Z":99.5};}
            }
          }
        }
        postAoe(`{"Name":"灵魂刻印3 塔 右上地板消失 低顺位踩塔位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":${JSON.stringify(ePos)},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":8.5,"During":7}`);
            


       
      },
    },
    // 灵魂刻印3 十字叉字处理器
    {
      id: 'P12S 灵魂刻印3 十字叉字处理器',
      type: 'Ability',
      netRegex: { id: '8312'},
      condition: (data) => data.灵魂刻印计数==3 && (data.灵魂刻印自己=='十字' || data.灵魂刻印自己=='x字'),
      suppressSeconds:1,
      run: async (data, matches) =>{
        if(data.灵魂刻印自己=='十字'){
          
          if (data.灵魂刻印3左上地板消失) {
            var ePos={"X":119.5,"Y":0,"Z":80.5};
            var ePos2={"X":110,"Y":0,"Z":87};
          }
          else {
            var ePos={"X":80.5,"Y":0,"Z":80.5};
            var ePos2={"X":90,"Y":0,"Z":87};
          }
        }
        if(data.灵魂刻印自己=='x字'){
          if (data.灵魂刻印3左上地板消失) {
            var ePos={"X":99.5,"Y":0,"Z":119.5};
            var ePos2={"X":90,"Y":0,"Z":115};
          }
          else{
            var ePos={"X":100.5,"Y":0,"Z":119.5};
            var ePos2={"X":110,"Y":0,"Z":115};
          }
        }
        postAoe(`{"Name":"灵魂刻印3 放${data.灵魂刻印自己}位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":${JSON.stringify(ePos)},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":5}`);
        postAoe(`{"Name":"灵魂刻印3 ${data.灵魂刻印自己}引导小怪位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":${JSON.stringify(ePos2)},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":5,"During":4}`);
        
      } 
    },
    // 灵魂刻印3 踩塔位置
    {
      id: 'P12S 灵魂刻印3 踩塔位置',
      type: 'Ability',
      netRegex: { id: ['830C','830D']},
      condition: (data) => data.灵魂刻印计数==3,
      run: async (data, matches) =>{
        if (data.灵魂刻印自己=='Nan') return;
        if (matches.id=='830C' && data.灵魂刻印自己=='光') return;
        if (matches.id=='830D' && data.灵魂刻印自己=='暗') return;

        
          var c1 = (await callOverlayHandler({
            call: 'getCombatants',
            ids: [parseInt(matches.sourceId, 16)],
          })).combatants;
          
          let dis=Math.hypot((c1[0].PosX-100),(c1[0].PosY-100));
          if((dis<3 && data.灵魂刻印3拉线方式=='正')||(dis>3 && data.灵魂刻印3拉线方式=='斜')){
            postAoe(`{"Name":"灵魂刻印3 踩塔位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"ActorId","DestinationValue":0x${matches.sourceId},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":3}`);
            postAoe(`{"Name":"灵魂刻印3 踩塔aoe","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":3,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":3}`);
          }
      } 
    },
    // 灵魂刻印3 最近引导范围
    {
      id: 'P12S 灵魂刻印3 最近引导范围',
      type: 'Ability',
      netRegex: { id: '82F1'},
      condition: (data) => data.灵魂刻印计数==3,
      suppressSeconds:1,
      run: async (data, matches) =>{
        if (data.灵魂刻印3左上地板消失) {
          postAoe(`{"Name":"灵魂刻印3 左上地板消失 最近引导范围","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":90,"Y":0,"Z":110.5},"TrackType":"Nearest","TrackValue":2,"Length":60,"Width":4,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":5,"During":3}`);
          postAoe(`{"Name":"灵魂刻印3 左上地板消失 最近引导范围","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":110,"Y":0,"Z":89.5},"TrackType":"Nearest","TrackValue":2,"Length":60,"Width":4,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":5,"During":3}`);
        }else{
          postAoe(`{"Name":"灵魂刻印3 右上地板消失 最近引导范围","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":110,"Y":0,"Z":109.5},"TrackType":"Nearest","TrackValue":2,"Length":60,"Width":4,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":5,"During":3}`);
          postAoe(`{"Name":"灵魂刻印3 右上地板消失 最近引导范围","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":90,"Y":0,"Z":90.5},"TrackType":"Nearest","TrackValue":2,"Length":60,"Width":4,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":5,"During":3}`);
        }
      } 
    },





    // 麻将点名
    {
      id: 'P12S 麻将点名记录器',
      type: 'HeadMarker',
      netRegex: {},
      run: (data, matches) => {
        const id = getHeadmarkerId(data, matches);
        if (!limitCutIds.includes(id))
          return;
        const num = limitCutMap[id];
        if (num === undefined)
          return;
        if (data.门神麻将点名===undefined) data.门神麻将点名=[];
        data.门神麻将点名[data.PartyIds.indexOf(parseInt(matches.targetId,16))]=num;
      },
      
    },
    {
      id: 'P12S 门神麻将起跑位置',
      type: 'StartsUsing',
      netRegex: { id: '82F5'},
      run: (data, matches) => {
        var bossPos={x:(parseFloat(matches.x)-100)/14*12+100,y:(parseFloat(matches.y)-100)/14*12+100};
        var nearPos={x:(parseFloat(matches.x)-100)/14*6+100,y:(parseFloat(matches.y)-100)/14*6+100};
        var centre={x:100,y:100};
        if (data.门神麻将点名[data.PartyIds.indexOf(data.myId)]==1||data.门神麻将点名[data.PartyIds.indexOf(data.myId)]==3) {
          var epos=RotatePointFromCentre(bossPos,centre,180);
        }
        if (data.门神麻将点名[data.PartyIds.indexOf(data.myId)]==2||data.门神麻将点名[data.PartyIds.indexOf(data.myId)]==4) {
          var epos=RotatePointFromCentre(bossPos,centre,22.5);
        }
        if (data.门神麻将点名[data.PartyIds.indexOf(data.myId)]==7) {
          var epos=RotatePointFromCentre(nearPos,centre,-45);
        }
        if (data.门神麻将点名[data.PartyIds.indexOf(data.myId)]==5) {
          var epos=RotatePointFromCentre(nearPos,centre,-90);
        }
        if (data.门神麻将点名[data.PartyIds.indexOf(data.myId)]==6||data.门神麻将点名[data.PartyIds.indexOf(data.myId)]==8) {
          var epos=RotatePointFromCentre(bossPos,centre,105);
        }
        postAoe(`{"Name":"门神麻将起跑位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":{"X":${epos.x},"Y":0,"Z":${epos.y}},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":9}`);
        postAoe(`{"Name":"门神麻将中心危险区域","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":100.0},"Radius":4,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":5,"During":25}`);
      },
    },
    //冲击波23m 
    {
      id: 'P12S 门神麻将冲击波',
      type: 'StartsUsing',
      netRegex: { id: '82F5'},
      run: (data, matches) => {
        var dur=2.4;
        var col=data.triggerSetConfig.DangerAoeCol%16777216;
        for (let i = 0; i < 8; i++) {
          var delay=9.2+(data.门神麻将点名[i]-2)*3.075;
          postAoe(`{"Name":"门神麻将冲击波${i}号","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":${data.PartyIds[i]},"Length":23,"Width":4.0,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":${delay},"During":${dur}}`);
          postAoe(`{"Name":"门神麻将冲击波${i}号描边","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":${data.PartyIds[i]},"Length":30,"Width":4.0,"Rotation":0.0,"Color":${col},"Delay":${delay},"During":${dur}}`);
        }
       },
    },
    //换位提醒
    {
      id: 'P12S 门神麻将换位提醒',
      type: 'Ability',
      netRegex: { id: '82F7'},
      suppressSeconds:1,
      alertText: (data, matches,output) => {
        if (data.门神麻将冲击波计数===undefined) data.门神麻将冲击波计数=0;
        data.门神麻将冲击波计数++;
        if (data.门神麻将冲击波计数==3 && (data.门神麻将点名[data.PartyIds.indexOf(data.myId)]==1 || data.门神麻将点名[data.PartyIds.indexOf(data.myId)]==3)) {
          return output.change();
        }
        if (data.门神麻将冲击波计数==3 && (data.门神麻将点名[data.PartyIds.indexOf(data.myId)]==5 || data.门神麻将点名[data.PartyIds.indexOf(data.myId)]==7)) {
          return output.change();
        }
        if (data.门神麻将冲击波计数==4 && (data.门神麻将点名[data.PartyIds.indexOf(data.myId)]==2 || data.门神麻将点名[data.PartyIds.indexOf(data.myId)]==4)) {
          return output.change();
        }
        if (data.门神麻将冲击波计数==4 && (data.门神麻将点名[data.PartyIds.indexOf(data.myId)]==6 || data.门神麻将点名[data.PartyIds.indexOf(data.myId)]==8)) {
          return output.change();
        }
        
      },
      outputStrings: {
        change: {
          cn: '换位',
        },
        
      },
    },
    {
      id: 'P12S Palladion White Flame Initial',
      type: 'StartsUsing',
      // 82F5 = Palladion cast
      // 8 seconds from Palladion starts casting to first White Flame damage
      // This is also an 8 second cast.
      // ~3 seconds after that for every potential White Flame
      netRegex: { id: '82F5', capture: false },
      // Don't collide with number callout.
      delaySeconds: 2,
      durationSeconds: (data) => {
        const delay = data.lcWhiteFlameDelay?.[0] ?? 1;
        // 8 seconds from cast start - 2 second delay already
        return (8 - 2) + 3 * (delay - 1) - 0.5;
      },
      response: (data, _matches, output) => {
        // cactbot-builtin-response
        output.responseOutputStrings = {
          baitLaser1: {
            en: 'Bait (${delay})',
            de: 'Laser Ködern (${delay})',
            fr: 'Bait le laser (${delay})',
            ja: 'レーザー誘導 (${delay})',
            cn: '靠前引导激光 (${delay})',
            ko: '레이저 유도 (${delay})',
          },
          baitLaser2: {
            en: 'Bait (${delay})',
            de: 'Laser Ködern (${delay})',
            fr: 'Bait le laser (${delay})',
            ja: 'レーザー誘導 (${delay})',
            cn: '靠后引导激光 (${delay})',
            ko: '레이저 유도 (${delay})',
          },
          
          ...whiteFlameDelayOutputStrings,
        };
        const delayMap = {
          1: output.delay1(),
          2: output.delay2(),
          3: output.delay3(),
          4: output.delay4(),
          5: output.delay5(),
        };
        const delayStr = delayMap[data.lcWhiteFlameDelay?.[0] ?? 1];
        if (data.limitCutNumber === 5)
          return { alertText: output.baitLaser2({ delay: delayStr })};
        if (data.limitCutNumber === 7)
          return { alertText: output.baitLaser1({ delay: delayStr })};
      },
    },
    {
      id: 'P12S Palladion White Flame Followup',
      type: 'Ability',
      netRegex: { id: '82EF', capture: false },
      condition: (data) => data.phase === 'palladion',
      preRun: (data) => data.whiteFlameCounter++,
      durationSeconds: (data) => {
        const delay = data.lcWhiteFlameDelay?.[data.whiteFlameCounter] ?? 1;
        return 3 * delay - 0.5;
      },
      response: (data, _matches, output) => {
        // cactbot-builtin-response
        output.responseOutputStrings = {
          baitLaser1: {
            en: 'Bait (${delay})',
            de: 'Laser Ködern (${delay})',
            fr: 'Bait le laser (${delay})',
            ja: 'レーザー誘導 (${delay})',
            cn: '靠前引导激光 (${delay})',
            ko: '레이저 유도 (${delay})',
          },
          baitLaser2: {
            en: 'Bait (${delay})',
            de: 'Laser Ködern (${delay})',
            fr: 'Bait le laser (${delay})',
            ja: 'レーザー誘導 (${delay})',
            cn: '靠后引导激光 (${delay})',
            ko: '레이저 유도 (${delay})',
          },
          
          ...whiteFlameDelayOutputStrings,
        };
        const delayMap = {
          1: output.delay1(),
          2: output.delay2(),
          3: output.delay3(),
          4: output.delay4(),
          5: output.delay5(),
        };
        const delayStr = delayMap[data.lcWhiteFlameDelay?.[data.whiteFlameCounter] ?? 1];
        const baitLaser1 = output.baitLaser1({ delay: delayStr });
        const baitLaser2 = output.baitLaser2({ delay: delayStr });
        if (data.whiteFlameCounter === 1) {
          if (data.limitCutNumber === 6)
            return { alertText: baitLaser2};
          if (data.limitCutNumber === 8)
            return { alertText: baitLaser1};
        }
        if (data.whiteFlameCounter === 2) {
          if (data.limitCutNumber === 1)
            return { alertText: baitLaser2};
          if (data.limitCutNumber === 3)
            return { alertText: baitLaser1};
        }
        if (data.whiteFlameCounter === 3) {
          if (data.limitCutNumber === 2)
            return { alertText: baitLaser2};
          if (data.limitCutNumber === 4)
            return { alertText: baitLaser1};
        }
      },
    },
    

    //超链理论单位收集
    {
      id: 'P12S 超链理论单位收集',
      type: 'AddedCombatant',
      netRegex: { npcNameId: superchainNpcNameId, npcBaseId: superchainNpcBaseIds },
      // Note: do not modify or clear this in any trigger but phase reset.
      run: (data, matches) => {
        if(data.超链单位Set.has(matches.id)) return;
        data.超链单位Set.add(matches.id);
        data.超链单位.push(matches);
        // console.log(`${data.超链单位.length}`);

      },
    },


    // 超链理论1 第一轮 1终点 钢铁/月环+四方/八方
    {
      id: 'P12S 超链理论1 第一轮',
      type: 'AddedCombatant',
      netRegex: { npcNameId: superchainNpcNameId, npcBaseId: superchainNpcBaseIds, capture: false },
      condition: (data) => data.phase === 'superchain1' && data.超链单位.length === 3,
      suppressSeconds:1,
      delaySeconds:0.1,
      run: (data, _matches, output) => {

        // destination: '16176',//结束点
        // out: '16177',//钢铁
        // in: '16178',//月环
        // protean: '16179',//八方
        // partners: '16180',//四方

        // console.log(JSON.stringify(data.超链单位));


        const [destMatches] = data.超链单位.filter((x) =>
          x.npcBaseId === superchainNpcBaseIdMap.destination
        );
        const [inOut] = data.超链单位.filter((x) =>
          x.npcBaseId === superchainNpcBaseIdMap.out || x.npcBaseId === superchainNpcBaseIdMap.in
        );
        const [proteanPartner] = data.超链单位.filter((x) =>
          x.npcBaseId === superchainNpcBaseIdMap.protean || x.npcBaseId === superchainNpcBaseIdMap.partners
        );



        if (destMatches !== undefined && inOut !== undefined) {
          if (inOut.npcBaseId==superchainNpcBaseIdMap.out) {
            postAoe(`{"Name":"超链理论1 第一轮 钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${destMatches.id},"Radius":7,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":11.5}`)
          }
          if (inOut.npcBaseId==superchainNpcBaseIdMap.in) {
            postAoe(`{"Name":"超链理论1 第一轮 月环","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${destMatches.id},"Radius":40,"InnerRadius":6,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":11.5}`);
          }
        }
        if (destMatches !== undefined && proteanPartner !== undefined) {
          
          if (proteanPartner.npcBaseId==superchainNpcBaseIdMap.protean) {
            data.PartyIds.forEach(id => {
              postAoe(`{"Name":"超链理论1 第一轮 八方","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${destMatches.id},"TrackType":"IdTrack","TrackValue":${id},"Radius":40,"Angle":30,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":8,"During":3.5}`);
            });
            }
          if (proteanPartner.npcBaseId == superchainNpcBaseIdMap.partners) {
            for (let i = 0; i < 4; i++) {
              var pid = data.PartyIds[partnerMap[data.PartyIds.indexOf(data.myId)]];
              if (data.PartyIds[i] == pid || data.PartyIds[i] == data.myId) {
                var col = data.triggerSetConfig.SafeAoeCol;
              } else {
                var col = data.triggerSetConfig.DangerAoeCol;
              }
              postAoe(`{"Name":"超链理论1 第一轮 四方","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${destMatches.id},"TrackType":"IdTrack","TrackValue":${data.PartyIds[i]},"Radius":40,"Angle":35,"Rotation":0.0,"Color":${col},"Delay":8,"During":3.5}`);
            }
          }
        }
      },
    },
    // 超链理论1 第二轮 2终点 钢铁+月环
    {
      id: 'P12S 超链理论1 第二轮',
      type: 'AddedCombatant',
      netRegex: { npcNameId: superchainNpcNameId, npcBaseId: superchainNpcBaseIds, capture: false },
      condition: (data) => data.phase === 'superchain1' && data.超链单位.length === 7,
      suppressSeconds:1,
      delaySeconds:0.1,
      run: (data, _matches, output) => {

        // destination: '16176',//结束点
        // out: '16177',//钢铁
        // in: '16178',//月环
        // protean: '16179',//八方
        // partners: '16180',//四方

        // console.log(JSON.stringify(data.超链单位));

        const collect = data.超链单位.slice(3, 7);

        const [dest1,dest2] = collect.filter((x) =>
          x.npcBaseId === superchainNpcBaseIdMap.destination
        );
        const [inOut1,inOut2] = collect.filter((x) =>
          x.npcBaseId === superchainNpcBaseIdMap.out || x.npcBaseId === superchainNpcBaseIdMap.in
        );

        let dis=Math.hypot((parseFloat(dest1.x)-parseFloat(inOut1.x)),(parseFloat(dest1.y)-parseFloat(inOut1.y)));
        const dist1Partner=Math.abs(dis-15)<1? inOut1:inOut2;
        const dist2Partner=Math.abs(dis-15)<1? inOut2:inOut1;



        if (dest1 !== undefined && dist1Partner !== undefined) {
          if (dist1Partner.npcBaseId==superchainNpcBaseIdMap.out) {
            postAoe(`{"Name":"超链理论1 第二轮 钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${dest1.id},"Radius":7,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":14}`)
          }
          if (dist1Partner.npcBaseId==superchainNpcBaseIdMap.in) {
            postAoe(`{"Name":"超链理论1 第二轮 月环","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${dest1.id},"Radius":40,"InnerRadius":6,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":7,"During":7}`);
          }
        }
        if (dest2 !== undefined && dist2Partner !== undefined) {
          if (dist2Partner.npcBaseId==superchainNpcBaseIdMap.out) {
            postAoe(`{"Name":"超链理论1 第二轮 钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${dest2.id},"Radius":7,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":14}`)
          }
          if (dist2Partner.npcBaseId==superchainNpcBaseIdMap.in) {
            postAoe(`{"Name":"超链理论1 第二轮 月环","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${dest2.id},"Radius":40,"InnerRadius":6,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":7,"During":7}`);
          }
        }
        
      },
    },
    // 超链理论1 第三轮 1终点 钢铁/月环 钢铁/月环
    {
      id: 'P12S 超链理论1 第三轮',
      type: 'AddedCombatant',
      netRegex: { npcNameId: superchainNpcNameId, npcBaseId: superchainNpcBaseIds, capture: false },
      condition: (data) => data.phase === 'superchain1' && data.超链单位.length === 10,
      suppressSeconds:1,
      delaySeconds:0.1,
      run: (data, _matches, output) => {

        // destination: '16176',//结束点
        // out: '16177',//钢铁
        // in: '16178',//月环
        // protean: '16179',//八方
        // partners: '16180',//四方

        // console.log(JSON.stringify(data.超链单位));

        const collect = data.超链单位.slice(7, 10);

        const [dest] = collect.filter((x) =>
          x.npcBaseId === superchainNpcBaseIdMap.destination
        );
        const [inOut1,inOut2] = collect.filter((x) =>
          x.npcBaseId === superchainNpcBaseIdMap.out || x.npcBaseId === superchainNpcBaseIdMap.in
        );

        let dis1=Math.hypot((parseFloat(dest.x)-parseFloat(inOut1.x)),(parseFloat(dest.y)-parseFloat(inOut1.y)));
        let dis2=Math.hypot((parseFloat(dest.x)-parseFloat(inOut2.x)),(parseFloat(dest.y)-parseFloat(inOut2.y)));
        const dist1Partner=dis1<dis2? inOut1:inOut2;
        const dist2Partner=dis1<dis2? inOut2:inOut1;
        



        if (dest !== undefined && dist1Partner !== undefined) {
          if (dist1Partner.npcBaseId==superchainNpcBaseIdMap.out) {
            postAoe(`{"Name":"超链理论1 第三轮 先钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${dest.id},"Radius":7,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":10,"During":4.8}`)
          }
          if (dist1Partner.npcBaseId==superchainNpcBaseIdMap.in) {
            postAoe(`{"Name":"超链理论1 第三轮 先月环","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${dest.id},"Radius":40,"InnerRadius":6,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":10,"During":4.8}`);
          }
        }
        if (dest !== undefined && dist2Partner !== undefined) {
          if (dist2Partner.npcBaseId==superchainNpcBaseIdMap.out) {
            postAoe(`{"Name":"超链理论1 第三轮 后钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${dest.id},"Radius":7,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":14.8,"During":2}`)
          }
          if (dist2Partner.npcBaseId==superchainNpcBaseIdMap.in) {
            postAoe(`{"Name":"超链理论1 第三轮 后月环","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${dest.id},"Radius":40,"InnerRadius":6,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":14.8,"During":2}`);
          }
        }
        
      },
    },

    // 超链理论 2A
    {
      id: 'P12S 超链理论 2A',
      type: 'AddedCombatant',
      netRegex: { npcNameId: superchainNpcNameId, npcBaseId: superchainNpcBaseIds, capture: false },
      condition: (data) => data.phase === 'superchain2a' && data.超链单位.length === 10,
      suppressSeconds:1,
      run: (data) => {
        var fDelay=11.8;
        const Dests = data.超链单位.filter((d) =>
          d.npcBaseId === superchainNpcBaseIdMap.destination
        );
        const [centreDest] = Dests.filter((d) =>
          Math.hypot((parseFloat(d.x)-100),(parseFloat(d.y)-100))<1
        );
        const [mech1,mech2] = data.超链单位.filter((x) =>
          x.npcBaseId === superchainNpcBaseIdMap.protean || x.npcBaseId === superchainNpcBaseIdMap.partners
        );
        for (let i = 0; i < Dests.length; i++) {
          if (Math.abs(Math.hypot((parseFloat(Dests[i].x)-parseFloat(mech1.x)),(parseFloat(Dests[i].y)-parseFloat(mech1.y)))-9)<1) {
            var dest1=Dests[i];
            var dest1p=mech1;
          }
          if (Math.abs(Math.hypot((parseFloat(Dests[i].x)-parseFloat(mech2.x)),(parseFloat(Dests[i].y)-parseFloat(mech2.y)))-9)<1) {
            var dest1=Dests[i];
            var dest1p=mech2;
          }
          if (Math.abs(Math.hypot((parseFloat(Dests[i].x)-parseFloat(mech1.x)),(parseFloat(Dests[i].y)-parseFloat(mech1.y)))-35)<1) {
            var dest2=Dests[i];
            var dest2p=mech1;
          }
          if (Math.abs(Math.hypot((parseFloat(Dests[i].x)-parseFloat(mech2.x)),(parseFloat(Dests[i].y)-parseFloat(mech2.y)))-35)<1) {
            var dest2=Dests[i];
            var dest2p=mech2;
          }
        }
        //第一轮 目的地1和中间钢铁 目的地1四方
        for (let i = 0; i < Dests.length; i++){
          if (Dests[i].id!==dest1.id) {
            postAoe(`{"Name":"超链理论2A 第一轮 钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${Dests[i].id},"Radius":7,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":${fDelay}}`);
          }
        }
        for (let i = 0; i < 4; i++) {
          var pid = data.PartyIds[partnerMap[data.PartyIds.indexOf(data.myId)]];
          if (data.PartyIds[i] == pid || data.PartyIds[i] == data.myId) {
            var col = data.triggerSetConfig.SafeAoeCol;
          } else {
            var col = data.triggerSetConfig.DangerAoeCol;
          }
          postAoe(`{"Name":"超链理论2A 第一轮 四方","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${dest1.id},"TrackType":"IdTrack","TrackValue":${data.PartyIds[i]},"Radius":40,"Angle":35,"Rotation":0.0,"Color":${col},"Delay":${fDelay-8.8},"During":8.8}`);
        }

        //第二轮 中间月环
        postAoe(`{"Name":"超链理论2A 第二轮 中月环","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${centreDest.id},"Radius":40,"InnerRadius":6,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":${fDelay},"During":2.4}`);
        postAoe(`{"Name":"超链理论2A 第二轮 中钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${centreDest.id},"Radius":7,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":${fDelay+2.4},"During":2.5}`);
        
        //第三轮 目的地1和中间钢铁 目的地1四方八方
        for (let i = 0; i < Dests.length; i++){
          if (Dests[i].id!==dest2.id && Dests[i].id!==centreDest.id) {
            postAoe(`{"Name":"超链理论2A 第三轮 钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${Dests[i].id},"Radius":7,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":${fDelay},"During":8.4}`);
          }
        }
        if (dest2p.npcBaseId==superchainNpcBaseIdMap.protean) {
          data.PartyIds.forEach(id => {
            postAoe(`{"Name":"超链理论2A 第三轮 八方","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${dest2.id},"TrackType":"IdTrack","TrackValue":${id},"Radius":40,"Angle":30,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":${fDelay+4.9},"During":3.5}`);
          });
          }
        if (dest2p.npcBaseId == superchainNpcBaseIdMap.partners) {
          for (let i = 0; i < 4; i++) {
            var pid = data.PartyIds[partnerMap[data.PartyIds.indexOf(data.myId)]];
            if (data.PartyIds[i] == pid || data.PartyIds[i] == data.myId) {
              var col = data.triggerSetConfig.SafeAoeCol;
            } else {
              var col = data.triggerSetConfig.DangerAoeCol;
            }
            postAoe(`{"Name":"超链理论2A 第三轮 四方","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${dest2.id},"TrackType":"IdTrack","TrackValue":${data.PartyIds[i]},"Radius":40,"Angle":35,"Rotation":0.0,"Color":${col},"Delay":${fDelay+4.9},"During":3.5}`);
          }
        }
        
      },
    },


    // 超链理论2B 贞女
    {
      id: 'P12S 超链理论2B 贞女',
      type: 'StartsUsing',
      netRegex: { id: '8303'},
      run: (data, matches, output) =>{
        postAoe(`{"Name":"超链理论2B 贞女","AoeType":"Straight","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":80,"Width":16.0,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":2,"During":3}`);
      }
      
      
    },
    // 超链理论2B 第一轮 2终点 钢铁+月环
    {
      id: '超链理论2B 第一轮',
      type: 'AddedCombatant',
      netRegex: { npcNameId: superchainNpcNameId, npcBaseId: superchainNpcBaseIds, capture: false },
      condition: (data) => data.phase === 'superchain2b' && data.超链单位.length === 4,
      suppressSeconds:1,
      run: (data, _matches, output) => {
        // Sort ascending. collect: [dest1, dest2, out/sphere, in/donut]
        const collect = data.超链单位.slice(0, 4);

        const [dest1,dest2] = collect.filter((x) =>
          x.npcBaseId === superchainNpcBaseIdMap.destination
        );
        const [inOut1,inOut2] = collect.filter((x) =>
          x.npcBaseId === superchainNpcBaseIdMap.out || x.npcBaseId === superchainNpcBaseIdMap.in
        );

        let dis=Math.hypot((parseFloat(dest1.x)-parseFloat(inOut1.x)),(parseFloat(dest1.y)-parseFloat(inOut1.y)));
        const dist1Partner=Math.abs(dis-9)<1? inOut1:inOut2;
        const dist2Partner=Math.abs(dis-9)<1? inOut2:inOut1;




        if (dest1 !== undefined && dist1Partner !== undefined) {
          if (dist1Partner.npcBaseId==superchainNpcBaseIdMap.out) {
            postAoe(`{"Name":"超链2B 第一轮 钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${dest1.id},"Radius":7,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":12.0}`)
          }
          if (dist1Partner.npcBaseId==superchainNpcBaseIdMap.in) {
            postAoe(`{"Name":"超链2B 第一轮 月环","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${dest1.id},"Radius":40,"InnerRadius":6,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":12.0}`);
          }
        }
        if (dest2 !== undefined && dist2Partner !== undefined) {
          if (dist2Partner.npcBaseId==superchainNpcBaseIdMap.out) {
            postAoe(`{"Name":"超链2B 第一轮 钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${dest2.id},"Radius":7,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":12.0}`)
          }
          if (dist2Partner.npcBaseId==superchainNpcBaseIdMap.in) {
            postAoe(`{"Name":"超链2B 第一轮 月环","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${dest2.id},"Radius":40,"InnerRadius":6,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":12.0}`);
          }
        }


      },
    },
    // 超链理论2B 第二轮 2终点 钢铁+四方八方
    {
      id: '超链理论2B 第二轮',
      type: 'AddedCombatant',
      netRegex: { npcNameId: superchainNpcNameId, npcBaseId: superchainNpcBaseIds, capture: false },
      condition: (data) => data.phase === 'superchain2b' && data.超链单位.length === 8,
      suppressSeconds:1,
      run: (data, _matches, output) => {

        var delay=8.4;
        // Sort ascending. collect: [dest1, dest2, out/sphere, in/donut]
        const collect = data.超链单位.slice(4, 8);

        const [dest1,dest2] = collect.filter((x) =>
          x.npcBaseId === superchainNpcBaseIdMap.destination
        );
        const [out] = collect.filter((x) =>
          x.npcBaseId === superchainNpcBaseIdMap.out
        );
        const [mech] = collect.filter((x) =>
          x.npcBaseId === superchainNpcBaseIdMap.protean || x.npcBaseId === superchainNpcBaseIdMap.partners
        );

        let dis=Math.hypot((parseFloat(dest1.x)-parseFloat(out.x)),(parseFloat(dest1.y)-parseFloat(out.y)));
        const dist1Partner=Math.abs(dis-18)<1? out:mech;
        const dist2Partner=Math.abs(dis-18)<1? mech:out;




        if (dest1 !== undefined && dist1Partner !== undefined) {
          if (dist1Partner.npcBaseId==superchainNpcBaseIdMap.out) {
            postAoe(`{"Name":"超链2B 第二轮 钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${dest1.id},"Radius":7,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":15.4}`)
          }
          if (dist1Partner.npcBaseId==superchainNpcBaseIdMap.protean) {
            data.PartyIds.forEach(id => {
              postAoe(`{"Name":"超链理论1 第二轮 八方","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${dest1.id},"TrackType":"IdTrack","TrackValue":${id},"Radius":40,"Angle":30,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":${delay+3},"During":4}`);
            });
            }
          if (dist1Partner.npcBaseId == superchainNpcBaseIdMap.partners) {
            for (let i = 0; i < 4; i++) {
              var pid = data.PartyIds[partnerMap[data.PartyIds.indexOf(data.myId)]];
              if (data.PartyIds[i] == pid || data.PartyIds[i] == data.myId) {
                var col = data.triggerSetConfig.SafeAoeCol;
              } else {
                var col = data.triggerSetConfig.DangerAoeCol;
              }
              postAoe(`{"Name":"超链理论1 第二轮 四方","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${dest1.id},"TrackType":"IdTrack","TrackValue":${data.PartyIds[i]},"Radius":40,"Angle":35,"Rotation":0.0,"Color":${col},"Delay":${delay+3},"During":4}`);
            }
          }
        }
        if (dest2 !== undefined && dist2Partner !== undefined) {
          if (dist2Partner.npcBaseId==superchainNpcBaseIdMap.out) {
            postAoe(`{"Name":"超链2B 第二轮 钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${dest2.id},"Radius":7,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":15.4}`)
          }
          if (dist2Partner.npcBaseId==superchainNpcBaseIdMap.protean) {
            data.PartyIds.forEach(id => {
              postAoe(`{"Name":"超链理论1 第二轮 八方","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${dest2.id},"TrackType":"IdTrack","TrackValue":${id},"Radius":40,"Angle":30,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":${delay+3},"During":4}`);
            });
            }
          if (dist2Partner.npcBaseId == superchainNpcBaseIdMap.partners) {
            for (let i = 0; i < 4; i++) {
              var pid = data.PartyIds[partnerMap[data.PartyIds.indexOf(data.myId)]];
              if (data.PartyIds[i] == pid || data.PartyIds[i] == data.myId) {
                var col = data.triggerSetConfig.SafeAoeCol;
              } else {
                var col = data.triggerSetConfig.DangerAoeCol;
              }
              postAoe(`{"Name":"超链理论1 第二轮 四方","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${dest2.id},"TrackType":"IdTrack","TrackValue":${data.PartyIds[i]},"Radius":40,"Angle":35,"Rotation":0.0,"Color":${col},"Delay":${delay+3},"During":4}`);
            }
          }
        }


      },
    },
    // 超链理论2B 第三轮 2终点 钢铁+钢铁八方
    {
      id: '超链理论2B 第三轮',
      type: 'AddedCombatant',
      netRegex: { npcNameId: superchainNpcNameId, npcBaseId: superchainNpcBaseIds, capture: false },
      condition: (data) => data.phase === 'superchain2b' && data.超链单位.length === 13,
      suppressSeconds:1,
      run: (data, _matches, output) => {
        var delay=13.5;

        // Sort ascending. collect: [dest1, dest2, out/sphere, in/donut]
        const collect = data.超链单位.slice(8, 13);

        const [dest1,dest2] = collect.filter((x) =>
          x.npcBaseId === superchainNpcBaseIdMap.destination
        );
        const [mech] = collect.filter((x) =>
          x.npcBaseId === superchainNpcBaseIdMap.protean || x.npcBaseId === superchainNpcBaseIdMap.partners
        );

        let dis=Math.hypot((parseFloat(dest1.x)-parseFloat(mech.x)),(parseFloat(dest1.y)-parseFloat(mech.y)));
        const distOfMech=Math.abs(dis-33)<1?dest1:dest2;

        postAoe(`{"Name":"超链2B 第三轮 钢铁1","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${dest1.id},"Radius":7,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":${delay},"During":6.6}`);
        postAoe(`{"Name":"超链2B 第三轮 钢铁2","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${dest2.id},"Radius":7,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":${delay},"During":6.6}`);
        data.PartyIds.forEach(id => {
          postAoe(`{"Name":"超链2B 第三轮 八方","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${distOfMech.id},"TrackType":"IdTrack","TrackValue":${id},"Radius":40,"Angle":30,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":${delay},"During":6.6}`);
        });
        


      },
    },
    //超链理论2B 坠落地板
    {
      id: 'P12S 超链理论2B 坠落地板',
      type: 'Tether',
      netRegex: { id: '00E8'},
      condition: (data) => data.phase === 'superchain2b',
      run: (data, matches) => {
        postAoe(`{"Name":"超链理论2B 坠落地板","AoeType":"Straight","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":10,"Width":20,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":4.3,"During":4}`);
      },
    },
    




    // --------------------- 本体 ------------------------

    // 小世界aoe
    {
      id: 'P12S 小世界地面aoe',
      type: 'StartsUsing',
      netRegex: { id: ['8329','832A','832B']},
      run: (data, matches) => {
        if (matches.id=='8329') {
          // 垂直
          postAoe(`{"Name":"小世界地面aoe 垂直","AoeType":"Straight","CentreType":"PostionValue","CentreValue":{"X":95,"Y":0,"Z":90},"Length":14.0,"Width":4,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":10.5}`);
          postAoe(`{"Name":"小世界地面aoe 垂直","AoeType":"Straight","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":90},"Length":14.0,"Width":4,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":10.5}`);
          postAoe(`{"Name":"小世界地面aoe 垂直","AoeType":"Straight","CentreType":"PostionValue","CentreValue":{"X":105,"Y":0,"Z":90},"Length":14.0,"Width":4,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":10.5}`);
        
        }
        if (matches.id=='832A') {
          // 月环
          postAoe(`{"Name":"小世界地面aoe 月环","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":90},"Radius":2,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":10.5}`);
          postAoe(`{"Name":"小世界地面aoe 月环","AoeType":"Donut","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":90.0},"Radius":7,"InnerRadius":3,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":10.5}`)
        }
        if (matches.id=='832B') {
          // 水平
          postAoe(`{"Name":"小世界地面aoe 水平","AoeType":"Straight","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":85},"Length":14.0,"Width":4,"Rotation":90.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":10.5}`);
          postAoe(`{"Name":"小世界地面aoe 水平","AoeType":"Straight","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":90},"Length":14.0,"Width":4,"Rotation":90.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":10.5}`);
          postAoe(`{"Name":"小世界地面aoe 水平","AoeType":"Straight","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":95},"Length":14.0,"Width":4,"Rotation":90.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":10.5}`);
        }

      },
    },
    // 本体小怪射线
    {
      id: 'P12S 本体小怪射线',
      type: 'StartsUsing',
      netRegex: { id: '8330'},
      run: (data, matches) => {
        postAoe(`{"Name":"本体小怪射线","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":20.0,"Width":6.0,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":7}`)

      },
      
    },
    //小怪连线挡枪
    {
      id: 'P12S 小怪连线挡枪位置',
      type: 'Tether',
      netRegex: { id: '0001' },
      condition: (data) => data.phase === 'gaiaochos2',
      run: async (data, matches) => {
        var tid = parseInt(matches.targetId, 16);
        var pid = data.PartyIds[partnerMap[data.PartyIds.indexOf(tid)]];
        var [c] = (await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        })).combatants;
        if (tid == data.myId) {
          var ePos = { "X": 100 - (c.PosX - 100) / 10 * 6.7, "Y": 0, "Z": 90 - (c.PosY - 90) / 10 * 6.7 };
          postAoe(`{"Name":"小怪连线挡枪位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":${JSON.stringify(ePos)},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":8.2}`);

        }
        if (pid == data.myId) {
          var ePos = { "X": 100 - (c.PosX - 100) / 10 * 6, "Y": 0, "Z": 90 - (c.PosY - 90) / 10 * 6 };
          postAoe(`{"Name":"小怪连线挡枪位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":${JSON.stringify(ePos)},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":8.2}`);

        }
      },
    },
   


    //经典概念 麻将
    // 本体麻将计数
    {
      id: 'P12S 本体麻将计数',
      type: 'StartsUsing',
      netRegex: { id: '8331'},
      run: (data, matches) => {
        if (data.本体麻将轮次===undefined) data.本体麻将轮次=0;
        data.本体麻将轮次++;
      },
      
    },
    // 经典概念 索尼收集
    {
      id: 'P12S 经典概念 索尼收集',
      type: 'HeadMarker',
      netRegex: {},
      condition: Conditions.targetIsYou(),
      run: (data, matches) => {
        const id = getHeadmarkerId(data, matches);
        // playstationCircle: '016F',
        // playstationTriangle: '0170',
        // playstationSquare: '0171',
        // playstationCross: '0172',
        if (id=='016F') {data.索尼 = 1;}
        if (id=='0170') {data.索尼 = 3;}
        if (id=='0171') {data.索尼 = 4;}
        if (id=='0172') {data.索尼 = 2;}
        
      },
    },
    // 经典概念 buff收集
    {
      id: 'P12S Classical Concepts Debuff',
      type: 'GainsEffect',
      netRegex: { effectId: ['DE8','DE9'] },
      condition: Conditions.targetIsYou(),
      run: (data, matches) => {
        data.麻将buff = matches.effectId=='DE8'?1:2;
      },
    },
    //麻将处理
    {
      id: 'P12S 经典概念 麻将处理',
      type: 'AddedCombatant',
      netRegex: { npcBaseId: ['16183','16184','16185'] },
      suppressSeconds:1,
      delaySeconds:0.5,
      run: async (data, matches) => {
        var offset=1.5;
        const cMap={
          16183: 'red',
          16184: 'blue',
          16185: 'yellow',
        }
        var combatantData = (await callOverlayHandler({
          call: 'getCombatants',
        })).combatants;

        var 麻将分布=[];
        if(data.麻将站位==undefined) data.麻将站位=[];

        var count=0;


        for (const c of combatantData) {
          if (c.BNpcID === 16183 || c.BNpcID === 16184 || c.BNpcID === 16185) {
            var line=Math.round(((parseFloat(c.PosX)-88)/8))+1; 
            var row=Math.round(((parseFloat(c.PosY)-84)/8))+1;
            麻将分布[row*10+line]=cMap[parseInt(c.BNpcID)];
            count++;
          }
        }
        // console.log(`${麻将分布[11]} ${麻将分布[12]} ${麻将分布[13]} ${麻将分布[14]}`);
        // console.log(`${麻将分布[21]} ${麻将分布[22]} ${麻将分布[23]} ${麻将分布[24]}`);
        // console.log(`${麻将分布[31]} ${麻将分布[32]} ${麻将分布[33]} ${麻将分布[34]}`);
        for (let line = 1; line < 5; line++) {
          for (let row = 1; row < 4; row++) {
            if ( 麻将分布[row * 10 + line] == 'blue') {
              // console.log(`${row * 10 + line}`);
              var aEnd = undefined;
              var bEnd = undefined;

              // 向上
              if (麻将分布[row * 10 + line - 10] == 'red') { aEnd = { "X": 88 + (line - 1) * 8, "Y": 0, "Z": 84 + ((row - 1) * 8) - offset }; }
              if ( 麻将分布[row * 10 + line - 10] == 'yellow') { bEnd = { "X": 88 + (line - 1) * 8, "Y": 0, "Z": 84 + ((row - 1) * 8) - offset }; }

              // 向右
              if ( 麻将分布[row * 10 + line + 1] == 'red') {
                if (aEnd === undefined) {
                  aEnd = { "X": 88 + (line - 1) * 8 + offset, "Y": 0, "Z": 84 + ((row - 1) * 8) };
                } else {
                  if ( 麻将分布[row * 10 + line + 1 - 10] != 'blue'
                    &&  麻将分布[row * 10 + line + 1 + 10] != 'blue'
                    &&  麻将分布[row * 10 + line + 1 + 1] != 'blue') {
                      aEnd = { "X": 88 + (line - 1) * 8 + offset, "Y": 0, "Z": 84 + ((row - 1) * 8) };
                  }
                }
              }
              if ( 麻将分布[row * 10 + line + 1] == 'yellow') {
                if (bEnd === undefined) {
                  bEnd = { "X": 88 + (line - 1) * 8 + offset, "Y": 0, "Z": 84 + ((row - 1) * 8) };
                } else {
                  if ( 麻将分布[row * 10 + line + 1 - 10] != 'blue'
                    &&  麻将分布[row * 10 + line + 1 + 10] != 'blue'
                    &&  麻将分布[row * 10 + line + 1 + 1] != 'blue') {
                      bEnd = { "X": 88 + (line - 1) * 8 + offset, "Y": 0, "Z": 84 + ((row - 1) * 8) };
                  }
                }
              }

              // 向下
              if ( 麻将分布[row * 10 + line + 10] == 'red') {
                if (aEnd === undefined) {
                  aEnd = { "X": 88 + (line - 1) * 8 , "Y": 0, "Z": 84 + ((row - 1) * 8)+ offset };
                } else {
                  if (  麻将分布[row * 10 + line + 10 + 10] != 'blue'
                    &&  麻将分布[row * 10 + line + 10 - 1] != 'blue'
                    &&  麻将分布[row * 10 + line + 10 + 1] != 'blue') {
                      aEnd = { "X": 88 + (line - 1) * 8 , "Y": 0, "Z": 84 + ((row - 1) * 8)+ offset };
                  }
                }
              }
              if ( 麻将分布[row * 10 + line + 10] == 'yellow') {
                if (bEnd === undefined) {
                  bEnd = { "X": 88 + (line - 1) * 8 , "Y": 0, "Z": 84 + ((row - 1) * 8)+ offset };
                } else {
                  if (  麻将分布[row * 10 + line + 10 + 10] != 'blue'
                    &&  麻将分布[row * 10 + line + 10 - 1] != 'blue'
                    &&  麻将分布[row * 10 + line + 10 + 1] != 'blue') {
                      bEnd = { "X": 88 + (line - 1) * 8 , "Y": 0, "Z": 84 + ((row - 1) * 8)+ offset };
                  }
                }
              }

              // 向左
              if ( 麻将分布[row * 10 + line - 1] == 'red') {
                if (aEnd === undefined) {
                  aEnd = { "X": 88 + (line - 1) * 8 - offset, "Y": 0, "Z": 84 + ((row - 1) * 8) };
                } else {
                  if ( 麻将分布[row * 10 + line - 1 - 10] != 'blue'
                    &&  麻将分布[row * 10 + line - 1 + 10] != 'blue'
                    &&  麻将分布[row * 10 + line - 1 - 1] != 'blue') {
                      aEnd = { "X": 88 + (line - 1) * 8 - offset, "Y": 0, "Z": 84 + ((row - 1) * 8) };
                  }
                }
              }
              if ( 麻将分布[row * 10 + line - 1] == 'yellow') {
                if (bEnd === undefined) {
                  bEnd = { "X": 88 + (line - 1) * 8 - offset, "Y": 0, "Z": 84 + ((row - 1) * 8) };
                } else {
                  if ( 麻将分布[row * 10 + line - 1 - 10] != 'blue'
                    &&  麻将分布[row * 10 + line - 1 + 10] != 'blue'
                    &&  麻将分布[row * 10 + line - 1 - 1] != 'blue') {
                      bEnd = { "X": 88 + (line - 1) * 8 - offset, "Y": 0, "Z": 84 + ((row - 1) * 8) };
                  }
                }
              }

              if (data.本体麻将轮次==1) {
                data.麻将站位[line*10+1]=aEnd;
                data.麻将站位[line*10+2]=bEnd;
              }
              if (data.本体麻将轮次==2) {
                data.麻将站位[line*10+1]={ "X": 100-(aEnd.X-100), "Y": 0, "Z": 92-(aEnd.Z-92)};
                data.麻将站位[line*10+2]={ "X": 100-(bEnd.X-100), "Y": 0, "Z": 92-(bEnd.Z-92)};;
              }
              
            }

          }

        }

        var dur=data.本体麻将轮次==1?12:18;
        postAoe(`{"Name":"麻将站位","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":${JSON.stringify(data.麻将站位[data.索尼*10+data.麻将buff])},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":${dur}}`);


        
      },
    },
    // 本体麻将方块爆炸
    {
      id: 'P12S 本体麻将方块爆炸',
      type: 'StartsUsing',
      netRegex: { id: '8333'},
      run: (data, matches) => {
        postAoe(`{"Name":"本体麻将方块爆炸","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":4,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":3}`);
      },
      
    },
    //第一次麻将 失去靠近buff 引导连线
    {
      id: 'P12S 第一次麻将 失去靠近buff 引导连线',
      type: 'LosesEffect',
      netRegex: { effectId: 'E04' },
      condition: (data, matches) => data.本体麻将轮次==1,
      suppressSeconds:1,
      // shapes use 8333 (Implode) at t+5.6s, and 8324 (Palladian Ray cleaves) snapshots at t+8.9s
      run: (data, matches) => {
        var epos=[];
        epos[11]={ "X": 85, "Y": 0, "Z": 88};
        epos[12]={ "X": 85, "Y": 0, "Z": 96};
        epos[21]={ "X": 92, "Y": 0, "Z": 88};
        epos[22]={ "X": 92, "Y": 0, "Z": 96};

        epos[41]={ "X": 115, "Y": 0, "Z": 88};
        epos[42]={ "X": 115, "Y": 0, "Z": 96};
        epos[31]={ "X": 108, "Y": 0, "Z": 88};
        epos[32]={ "X": 108, "Y": 0, "Z": 96};
        postAoe(`{"Name":"第一次麻将 失去靠近buff 引导连线","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":${JSON.stringify(epos[data.索尼*10+data.麻将buff])},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":9}`);

      },
    },
    //第二次麻将 方块连线 引导射线
    {
      id: 'P12S 第二次麻将 方块连线 引导射线',
      type: 'Tether',
      netRegex: { id: '0001'},
      condition: (data, matches) => data.本体麻将轮次==2 && data.phase !== 'gaiaochos2',
      suppressSeconds:1,
      run: (data, matches) => {
        var epos=[];
        epos[11]={ "X": 112, "Y": 0, "Z": 88};
        epos[12]={ "X": 112, "Y": 0, "Z": 96};
        epos[21]={ "X": 104, "Y": 0, "Z": 88};
        epos[22]={ "X": 104, "Y": 0, "Z": 96};

        epos[41]={ "X": 88, "Y": 0, "Z": 88};
        epos[42]={ "X": 88, "Y": 0, "Z": 96};
        epos[31]={ "X": 96, "Y": 0, "Z": 88};
        epos[32]={ "X": 96, "Y": 0, "Z": 96};
        postAoe(`{"Name":"第二次麻将 方块连线 引导射线","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":${JSON.stringify(epos[data.索尼*10+data.麻将buff])},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":3.5}`);

      },
    },
    // 本体麻将射线范围
    {
      id: 'P12S 本体麻将射线',
      type: 'Ability',
      netRegex: { id: ['8324']},
      run: (data, matches) => {
        postAoe(`{"Name":"本体麻将射线","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":40,"Angle":30,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":4}`);
      },
      
    },


    //风火1 开局点名记录
    {
      id: 'P12S 风火1 开局点名记录',
      type: 'HeadMarker',
      netRegex: {},
      run: (data, matches) => {
        if (getHeadmarkerId(data, matches) === `012F`){
          if (data.本体风点名===undefined) data.本体风点名=[];
          var id=parseInt(matches.targetId,16);
          if(data.PartyIds.indexOf(id)<4)
          {
            data.本体风点名[0]=id;
          }else{
            data.本体风点名[1]=id;
          }
        }
          
      },
    },
    //风火1 开局分摊及闲人站位
    {
      id: 'P12S 风火1 开局分摊及闲人站位',
      type: 'StartsUsing',
      netRegex: { id: '833D'},
      run: (data, matches) => {
        postAoe(`{"Name":"风火1 开局分摊","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":4,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":5,"During":3}`);
        if(data.本体风点名[0]==data.myId){var epos={"X":98.5,"Y":0,"Z":89.0};}
        if(data.本体风点名[1]==data.myId){var epos={"X":101.5,"Y":0,"Z":89.0};}
        if(data.本体风点名[0]!=data.myId && data.本体风点名[1]!=data.myId){var epos={"X":100,"Y":0,"Z":97};}
        postAoe(`{"Name":"风火1 开局分摊及闲人站位","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":${JSON.stringify(epos)},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":8}`);
      },
    },
    // 风火1 风点名
    {
      id: 'P12S 风火1 风点名',
      type: 'GainsEffect',
      // E07 = Atmosfaction
      netRegex: { effectId: 'E07' },
      run: (data, matches) => {
        var id=parseInt(matches.targetId,16);
        var index= data.本体风点名.indexOf(id);
        if (index==0 ||index==1) return;
        if (data.本体风点名[2]==undefined) {
          data.本体风点名[2]=id;
        }else{
          if(data.PartyIds.indexOf(id)<data.PartyIds.indexOf(data.本体风点名[2]))
          {
            var buffer=data.本体风点名[2];
            data.本体风点名[2]=id;
            data.本体风点名[3]=buffer;
          }else{
            data.本体风点名[3]=id;
          }
        }


      },
    },
    // 风火1 火点名
    {
      id: 'P12S 风火1 火点名',
      type: 'GainsEffect',
      // E06 = Pyrefaction
      netRegex: { effectId: 'E06' },
      run: (data, matches) => {
          if (data.本体火点名===undefined) data.本体火点名=[];
          var id=parseInt(matches.targetId,16);
          data.本体火点名.push(id);
          postAoe(`{"Name":"风火1 火点名","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":4,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":${parseFloat(matches.duration)-3},"During":3}`);
      },
    },
    // 风火1 处理器
    {
      id: 'P12S 风火1 处理器',
      type: 'GainsEffect',
      // E06 = Pyrefaction
      netRegex: { effectId: 'E06' },
      delaySeconds:0.2,
      suppressSeconds:1,
      run: (data, matches) => {
        if (data.本体火点名.length==4) {
          data.本体火点名.sort((a,b)=>{return data.PartyIds.indexOf(a)-data.PartyIds.indexOf(b)});
          let pos=[];
          pos[0]={"X":97.75,"Y":0,"Z":89.0};
          pos[1]={"X":102.25,"Y":0,"Z":89.0};
          pos[2]={"X":97.75,"Y":0,"Z":92.0};
          pos[3]={"X":102.25,"Y":0,"Z":92.0};
          pos[4]={"X":102.25,"Y":0,"Z":97.0};
          pos[5]={"X":97.75,"Y":0,"Z":97.0};
          if (data.本体风点名[0]==data.myId) var epos=pos[0];
          if (data.本体风点名[1]==data.myId) var epos=pos[1];
          if (data.本体风点名[2]==data.myId) var epos=pos[4];
          if (data.本体风点名[3]==data.myId) var epos=pos[5];

          if (data.本体火点名[0]==data.myId) var epos=pos[2];
          if (data.本体火点名[1]==data.myId) var epos=pos[3];
          if (data.本体火点名[2]==data.myId) var epos=pos[4];
          if (data.本体火点名[3]==data.myId) var epos=pos[5];
          postAoe(`{"Name":"风火1 第一轮站位","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":${JSON.stringify(epos)},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":12}`);
        }
        if (data.本体火点名.length==6) {
          let pos=[];
          pos[0]={"X":93.1,"Y":0,"Z":85.0};
          pos[1]={"X":106.9,"Y":0,"Z":85.0};
          pos[2]={"X":106.9,"Y":0,"Z":101.0};
          pos[3]={"X":93.1,"Y":0,"Z":101.0};

          pos[4]={"X":97.75,"Y":0,"Z":92.0};
          pos[5]={"X":102.25,"Y":0,"Z":92.0};
          
          if (data.本体风点名[0]==data.myId) var epos=pos[0];
          if (data.本体风点名[1]==data.myId) var epos=pos[1];
          if (data.本体风点名[2]==data.myId) var epos=pos[2];
          if (data.本体风点名[3]==data.myId) var epos=pos[3];

          if (data.本体火点名[0]==data.myId) var epos=pos[4];
          if (data.本体火点名[1]==data.myId) var epos=pos[5];

          if (data.本体火点名.indexOf(data.本体火点名[4])+data.本体火点名.indexOf(data.本体火点名[5])==3) {
            if (data.本体火点名[2]==data.myId) var epos=pos[4];
            if (data.本体火点名[3]==data.myId) var epos=pos[5];
          }else{
            if (data.本体火点名[2]==data.myId) var epos=pos[5];
            if (data.本体火点名[3]==data.myId) var epos=pos[4];
          }
          
          postAoe(`{"Name":"风火1 第二轮站位","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":${JSON.stringify(epos)},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":11}`);
        }
      },
    },


    //风火2
    // 初始火点名
    {
      id: 'P12S 风火2 初始火点名',
      type: 'HeadMarker',
      netRegex: {},
      run: (data, matches) => {
        // cactbot-builtin-response
        const id = getHeadmarkerId(data, matches);
        if (id !== '01D6') return;

        let spos=[];
        spos[0]={"X":100,"Y":0,"Z":93};
        spos[1]={"X":93.1,"Y":0,"Z":97};
        spos[2]={"X":100,"Y":0,"Z":101};
        spos[3]={"X":100,"Y":0,"Z":85};
        spos[4]={"X":93.1,"Y":0,"Z":89};
        spos[5]={"X":106.9,"Y":0,"Z":97};
        spos[6]={"X":106.9,"Y":0,"Z":105};
        spos[7]={"X":106.9,"Y":0,"Z":89};


        if (data.me === matches.target){var epos=spos[0];}
        var index=data.PartyIds.indexOf(data.myId);
        if (index!==0 && data.me !== matches.target){
          data.风火2起跑编号=index;
          var epos=spos[index];
        }
        if (index===0 && data.me !== matches.target){
          data.风火2起跑编号=data.PartyIds.indexOf(parseInt(matches.targetId,16));
          var epos=spos[data.风火2起跑编号];
        }
        postAoe(`{"Name":"风火2 初始站位","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":${JSON.stringify(epos)},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":8}`);
        
      },
    },
    {
      id: 'P12S 风火2 传火位置',
      type: 'StartsUsing',
      netRegex: { id: '833C'},
      run: async (data, matches) => {
        var [c] = (await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        })).combatants;
        
        var [m] = (await callOverlayHandler({
          call: 'getCombatants',
          ids: [data.myId],
        })).combatants;
        let dis=Math.hypot((c.PosX-m.PosX),(c.PosY-m.PosY));

        if (dis < 2) {
          if (data.风火2传火) {

            let m2pos = [];
            m2pos[0] = { "X": 100, "Y": 0, "Z": 93 };
            m2pos[1] = { "X": 93.1, "Y": 0, "Z": 105 };
            m2pos[2] = { "X": 113.8, "Y": 0, "Z": 101 };
            m2pos[3] = { "X": 86.2, "Y": 0, "Z": 85 };
            m2pos[4] = { "X": 86.2, "Y": 0, "Z": 93 };
            m2pos[5] = { "X": 113.8, "Y": 0, "Z": 85 };
            m2pos[6] = { "X": 113.8, "Y": 0, "Z": 93 };
            m2pos[7] = { "X": 93.1, "Y": 0, "Z": 81 };
            var epos = m2pos[data.风火2起跑编号];
            postAoe(`{"Name":"风火2 传火后躲避位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":${JSON.stringify(epos)},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":3}`);

          } else {
            data.风火2传火 = true;
            let m1pos = [];
            m1pos[0] = { "X": 100, "Y": 0, "Z": 93 };
            m1pos[1] = { "X": 100, "Y": 0, "Z": 101 };
            m1pos[2] = { "X": 106.9, "Y": 0, "Z": 105 };
            m1pos[3] = { "X": 93.1, "Y": 0, "Z": 89 };
            m1pos[4] = { "X": 93.1, "Y": 0, "Z": 97 };
            m1pos[5] = { "X": 106.9, "Y": 0, "Z": 89 };
            m1pos[6] = { "X": 106.9, "Y": 0, "Z": 97 };
            m1pos[7] = { "X": 100, "Y": 0, "Z": 85 };

            var epos = m1pos[data.风火2起跑编号];
            postAoe(`{"Name":"风火2 传火位置","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":${JSON.stringify(epos)},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":3.25}`);

          }



        }
        
      },
      
    },
   

    //踩塔buff
    // 踩塔初始Buff收集
    {
      id: 'P12S 踩塔初始Buff收集',
      type: 'GainsEffect',
      netRegex: { effectId: ['E09','DF8','DF9'] },
      condition: (data) => data.phase === 'pangenesis',
      run: (data, matches) => {
        // stableSystem: 'E22', 不合成
        // unstableFactor: 'E09', 消灭因子
        // lightTilt: 'DF8', 光
        // darkTilt: 'DF9', 暗

        // 闲人 0
        // 1层 1
        // 2层短光 2
        // 2层短暗 3
        // 2层长光 4
        // 2层长暗 5
        if (data.本体踩塔Buff===undefined) data.本体踩塔Buff=[0,0,0,0,0,0,0,0];

        var index=data.PartyIds.indexOf(parseInt(matches.targetId,16));
        const duration = parseFloat(matches.duration);
        if ((matches.effectId=='E09' && matches.count === '01')) {
          if (Math.abs(duration-27)<1) {
            data.本体踩塔Buff[index]=1;
          }
        }
        if ((matches.effectId=='DF8')) {
          if (Math.abs(duration-16)<1) {
            data.本体踩塔Buff[index]=2;
          }
          if (Math.abs(duration-20)<1) {
            data.本体踩塔Buff[index]=4;
          }
        }
        if ((matches.effectId=='DF9')) {
          if (Math.abs(duration-16)<1) {
            data.本体踩塔Buff[index]=3;
          }
          if (Math.abs(duration-20)<1) {
            data.本体踩塔Buff[index]=5;
          }
        }
      },
    },
    // 踩塔光暗颜色收集
    {
      id: 'P12S 踩塔光暗颜色收集',
      type: 'GainsEffect',
      netRegex: { effectId: ['DF8','DF9'] },
      condition: (data, matches) => matches.target === data.me && data.phase === 'pangenesis',
      run: (data, matches) => {
        data.踩塔颜色 = matches.effectId === 'DF8' ? 'light' : 'dark';
      }
    },
    // 踩塔处理器
    {
      id: 'P12S 踩塔处理器',
      type: 'StartsUsing',
      netRegex: { id: '8343'},
      suppressSeconds:1,
      delaySeconds:0.6,
      run: async (data, matches) => {
        if (data.本体踩塔计数===undefined) data.本体踩塔计数=0;
        data.本体踩塔计数++;
        var indexMe=data.PartyIds.indexOf(data.myId);
        if (data.本体踩塔计数===1) {
          var [c] = (await callOverlayHandler({
            call: 'getCombatants',
            ids: [parseInt(matches.sourceId, 16)],
          })).combatants;

          data.本体踩塔初始白=c.PosX>100?'右':'左';
          
          if((data.本体踩塔Buff.indexOf(0)==indexMe && data.本体踩塔初始白=='右')||(data.本体踩塔Buff.lastIndexOf(0)==indexMe && data.本体踩塔初始白=='左')){
            data.踩塔颜色 = 'dark';
          }
          if((data.本体踩塔Buff.indexOf(0)==indexMe && data.本体踩塔初始白=='左')||(data.本体踩塔Buff.lastIndexOf(0)==indexMe && data.本体踩塔初始白=='右')){
            data.踩塔颜色 = 'light';
          }
          if((data.本体踩塔Buff.indexOf(1)==indexMe && data.本体踩塔初始白=='右')||(data.本体踩塔Buff.lastIndexOf(1)==indexMe && data.本体踩塔初始白=='左')){
            data.踩塔颜色 = 'light';
          }
          if((data.本体踩塔Buff.indexOf(1)==indexMe && data.本体踩塔初始白=='左')||(data.本体踩塔Buff.lastIndexOf(1)==indexMe && data.本体踩塔初始白=='右')){
            data.踩塔颜色 = 'dark';
          }

          if (data.本体踩塔Buff.indexOf(0)==indexMe || data.本体踩塔Buff.indexOf(1)==indexMe) {data.本体踩塔分组='左'};
          if (data.本体踩塔Buff.lastIndexOf(0)==indexMe || data.本体踩塔Buff.lastIndexOf(1)==indexMe) {data.本体踩塔分组='右'};
          if (data.本体踩塔Buff[indexMe]==3||data.本体踩塔Buff[indexMe]==5){data.本体踩塔分组=data.本体踩塔初始白};
          if (data.本体踩塔Buff[indexMe]==2||data.本体踩塔Buff[indexMe]==4){data.本体踩塔分组=c.PosX>100?'左':'右';};

          console.log(`${data.本体踩塔Buff} ${data.本体踩塔分组},${data.踩塔颜色}`);
          // 闲人 0
          // 1层 1
          // 2层短光 2
          // 2层短暗 3
          // 2层长光 4
          // 2层长暗 5
          if(data.本体踩塔初始白=='左')
          {
            if(data.本体踩塔Buff[indexMe]==1 && data.踩塔颜色 == 'dark') {var epos={"X":85,"Y":0,"Z":91};}
            if(data.本体踩塔Buff[indexMe]==1 && data.踩塔颜色 == 'light') {var epos={"X":115,"Y":0,"Z":91};}

            if(data.本体踩塔Buff[indexMe]==2) {var epos={"X":115,"Y":0,"Z":91};}
            if(data.本体踩塔Buff[indexMe]==3) {var epos={"X":85,"Y":0,"Z":91};}

            if(data.本体踩塔Buff[indexMe]==0 && data.踩塔颜色 == 'light') {var epos={"X":90,"Y":0,"Z":87};}
            if(data.本体踩塔Buff[indexMe]==0 && data.踩塔颜色 == 'dark') {var epos={"X":110,"Y":0,"Z":87};}
            if(data.本体踩塔Buff[indexMe]==5) {var epos={"X":90,"Y":0,"Z":95};}
            if(data.本体踩塔Buff[indexMe]==4) {var epos={"X":110,"Y":0,"Z":95};}

          }
          if(data.本体踩塔初始白=='右')
          {
            if(data.本体踩塔Buff[indexMe]==1 && data.踩塔颜色 == 'dark') {var epos={"X":115,"Y":0,"Z":91};}
            if(data.本体踩塔Buff[indexMe]==1 && data.踩塔颜色 == 'light') {var epos={"X":85,"Y":0,"Z":91};}

            if(data.本体踩塔Buff[indexMe]==2) {var epos={"X":85,"Y":0,"Z":91};}
            if(data.本体踩塔Buff[indexMe]==3) {var epos={"X":115,"Y":0,"Z":91};}

            if(data.本体踩塔Buff[indexMe]==0 && data.踩塔颜色 == 'light') {var epos={"X":110,"Y":0,"Z":87};}
            if(data.本体踩塔Buff[indexMe]==0 && data.踩塔颜色 == 'dark') {var epos={"X":90,"Y":0,"Z":87};}

            if(data.本体踩塔Buff[indexMe]==5) {var epos={"X":110,"Y":0,"Z":95};}
            if(data.本体踩塔Buff[indexMe]==4) {var epos={"X":90,"Y":0,"Z":95};}
          }
          postAoe(`{"Name":"本体踩塔 第一轮","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":${JSON.stringify(epos)},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":5}`);
          
          if (data.triggerSetConfig.P12s_截线标记) {
            sendMark({ ActorID: data.PartyIds[data.本体踩塔Buff.indexOf(0)], MarkType: 'bind1', LocalOnly: false, });
            sendMark({ ActorID: data.PartyIds[data.本体踩塔Buff.lastIndexOf(0)], MarkType: 'bind2', LocalOnly: false, });
          }
          
        }
        if (data.本体踩塔计数===2){
          if(data.本体踩塔初始白=='左'){
            if (data.本体踩塔分组=='左') {
              if (data.踩塔颜色 == 'dark') {var epos={"X":90,"Y":0,"Z":95};}
              if (data.踩塔颜色 == 'light') {var epos={"X":90,"Y":0,"Z":87};}
            }
            if (data.本体踩塔分组=='右') {
              if (data.踩塔颜色 == 'dark') {var epos={"X":110,"Y":0,"Z":87};}
              if (data.踩塔颜色 == 'light') {var epos={"X":110,"Y":0,"Z":95};}
            }
          }
          if(data.本体踩塔初始白=='右'){
            if (data.本体踩塔分组=='左') {
              if (data.踩塔颜色 == 'dark') {var epos={"X":90,"Y":0,"Z":87};}
              if (data.踩塔颜色 == 'light') {var epos={"X":90,"Y":0,"Z":95};}
            }
            if (data.本体踩塔分组=='右') {
              if (data.踩塔颜色 == 'dark') {var epos={"X":110,"Y":0,"Z":95};}
              if (data.踩塔颜色 == 'light') {var epos={"X":110,"Y":0,"Z":87};}
            }
          }
          postAoe(`{"Name":"本体踩塔 第二轮","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":${JSON.stringify(epos)},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":5}`);
        }
        if (data.本体踩塔计数===3){
          if(data.本体踩塔初始白=='左'){
            if (data.本体踩塔分组=='左') {
              if (data.踩塔颜色 == 'dark') {var epos={"X":96,"Y":0,"Z":95};}
              if (data.踩塔颜色 == 'light') {var epos={"X":96,"Y":0,"Z":87};}
            }
            if (data.本体踩塔分组=='右') {
              if (data.踩塔颜色 == 'dark') {var epos={"X":104,"Y":0,"Z":87};}
              if (data.踩塔颜色 == 'light') {var epos={"X":104,"Y":0,"Z":95};}
            }
          }
          if(data.本体踩塔初始白=='右'){
            if (data.本体踩塔分组=='左') {
              if (data.踩塔颜色 == 'dark') {var epos={"X":96,"Y":0,"Z":87};}
              if (data.踩塔颜色 == 'light') {var epos={"X":96,"Y":0,"Z":95};}
            }
            if (data.本体踩塔分组=='右') {
              if (data.踩塔颜色 == 'dark') {var epos={"X":104,"Y":0,"Z":95};}
              if (data.踩塔颜色 == 'light') {var epos={"X":104,"Y":0,"Z":87};}
            }
          }
          postAoe(`{"Name":"本体踩塔 第三轮","AoeType":"Goto","CentreType":"ActorId","CentreValue":${data.myId},"DestinationType":"PostionValue","DestinationValue":${JSON.stringify(epos)},"Thikness":5,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":5}`);
        }
      }
      
    },


    {
      id: 'P12S Pangenesis Initial',
      type: 'GainsEffect',
      netRegex: { effectId: 'E22', capture: false },
      delaySeconds: 0.5,
      durationSeconds: (data) => {
        // There's ~13 seconds until the first tower and ~18 until the second tower.
        // Based on the strat chosen in the triggerset config, to avoid noisy alerts,
        // only extend duration for the long tilts and other players not taking the first towers.
        const myRole = data.pangenesisRole[data.me];
        if (myRole === undefined)
          return;
        const strat = data.triggerSetConfig.pangenesisFirstTower;
        const longerDuration = ['longDark', 'longLight'];
        if (strat === 'one')
          longerDuration.push('not');
        else if (strat === 'not')
          longerDuration.push('one');
        return longerDuration.includes(myRole) ? 17 : 12;
      },
      suppressSeconds: 999999,
      alertText: (data, _matches, output) => {
        const strat = data.triggerSetConfig.pangenesisFirstTower;
        const myRole = data.pangenesisRole[data.me];
        if (myRole === undefined)
          return;
        if (myRole === 'shortLight')
          return output.shortLight();
        if (myRole === 'longLight')
          return strat === 'not' ? output.longLightMerge() : output.longLight();
        if (myRole === 'shortDark')
          return output.shortDark();
        if (myRole === 'longDark')
          return strat === 'not' ? output.longDarkMerge() : output.longDark();
        const myBuddy = Object.keys(data.pangenesisRole).find((x) => {
          return data.pangenesisRole[x] === myRole && x !== data.me;
        });
        const player = myBuddy === undefined ? output.unknown() : data.ShortName(myBuddy);
        if (myRole === 'not') {
          if (strat === 'not')
            return output.nothingWithTower({ player: player, tower: output.firstTower() });
          else if (strat === 'one')
            return output.nothingWithTower({ player: player, tower: output.secondTower() });
          return output.nothing({ player: player });
        }
        if (strat === 'not')
          return output.oneWithTower({ player: player, tower: output.secondTowerMerge() });
        else if (strat === 'one')
          return output.oneWithTower({ player: player, tower: output.firstTower() });
        return output.one({ player: player });
      },
      run: (data) => data.pangenesisDebuffsCalled = true,
      outputStrings: {
        nothing: {
          en: 'Nothing (w/${player})',
          de: 'Nichts (mit ${player})',
          ja: '無職: 2番目の上の塔 (${player})',
          cn: '闲人: 踩第2轮塔 (${player})',
          ko: '디버프 없음 (+ ${player})',
        },
        nothingWithTower: {
          en: 'Nothing (w/${player}) - ${tower}',
          de: 'Nichts (mit ${player}) - ${tower}',
          cn: '闲人 (和 ${player}) - ${tower}',
          ko: '디버프 없음 (+ ${player}) - ${tower}',
        },
        one: {
          en: 'One (w/${player})',
          de: 'Eins (mit ${player})',
          ja: '因子1: 1番目の塔 (${player})',
          cn: '单因子: 踩第1轮塔 (${player})',
          ko: '1번 (+ ${player})',
        },
        oneWithTower: {
          en: 'One (w/${player}) - ${tower}',
          de: 'Eins (mit ${player}) - ${tower}',
          cn: '单因子 (和 ${player}) - ${tower}',
          ko: '1번 (+ ${player}) - ${tower}',
        },
        shortLight: {
          en: 'Short Light (get first dark)',
          de: 'Hell kurz (nimm erstes Dunkel)',
          ja: '早: 1番目のやみ塔',
          cn: '短光: 踩第1轮黑塔',
          ko: '짧은 빛 (첫 어둠 대상)',
        },
        longLight: {
          en: 'Long Light (get second dark)',
          de: 'Hell lang (nimm zweites Dunkel)',
          ja: '遅: 2番目の下のやみ塔',
          cn: '长光: 踩第2轮黑塔',
          ko: '긴 빛 (두번째 어둠 대상)',
        },
        longLightMerge: {
          en: 'Long Light (get second dark - merge first)',
          de: 'Hell lang (nimm zweites Dunkel - zuerst kombinieren)',
          cn: '长光 (踩第2轮黑塔 - 先合成)',
          ko: '긴 빛 (두번째 어둠 대상 - 융합 먼저)',
        },
        shortDark: {
          en: 'Short Dark (get first light)',
          de: 'Dunkel kurz (nimm erstes Hell)',
          ja: '早: 1番目のひかり塔',
          cn: '短暗: 踩第1轮白塔',
          ko: '짧은 어둠 (첫 빛 대상)',
        },
        longDark: {
          en: 'Long Dark (get second light)',
          de: 'Dunkel lang (nimm zweites Hell)',
          ja: '遅: 2番目の下のひかり塔',
          cn: '长暗: 踩第2轮白塔',
          ko: '긴 어둠 (두번째 빛 대상)',
        },
        longDarkMerge: {
          en: 'Long Dark (get second light - merge first)',
          de: 'Dunkel lang (nimm zweites Hell - zuerst kombinieren)',
          cn: '长暗 (踩第2轮白塔 - 先合成)',
          ko: '긴 어둠 (두번째 빛 대상 - 융합 먼저)',
        },
        firstTower: {
          en: 'First Tower',
          de: 'Erster Turm',
          cn: '1 塔',
          ko: '첫번째 기둥',
        },
        secondTower: {
          en: 'Second Tower',
          de: 'Zweiter Turm',
          cn: '2 塔',
          ko: '두번째 기둥',
        },
        secondTowerMerge: {
          en: 'Second Tower (Merge first)',
          de: 'Zweiter Turm (zuerst kombinieren)',
          cn: '2 塔 (先合成)',
          ko: '두번째 기둥 (융합 먼저)',
        },
        unknown: Outputs.unknown,
      },
    },
    


    
    

    
    // 小世界分散aoe
    {
      id: 'P12S 小世界分散aoe',
      type: 'HeadMarker',
      netRegex: {},
      suppressSeconds:1,
      run: (data, matches) => {
        // cactbot-builtin-response
        const id = getHeadmarkerId(data, matches);
        if (id !== '0016') return;
        for (let index = 0; index < 8; index++) {
          postAoe(`{"Name":"本体小世界分散aoe","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[index]},"Radius":1,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":3}`);
        }
      },
    },
    

    //地火陨石
    {
      id: 'P12S 本体地火',
      type: 'StartsUsing',
      netRegex: { id: '831F'},
      run: async (data, matches) => {
        var [c] = (await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        })).combatants;
        var sin=Math.sin(c.Heading);
        var cos=Math.cos(c.Heading);
        postAoe(`{"Name":"本体地火","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":6,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":6}`);
        postAoe(`{"Name":"本体地火2","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${c.PosX+sin*8},"Y":0,"Z":${c.PosY+cos*8}},"Radius":6.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":4,"During":4}`);
        postAoe(`{"Name":"本体地火3","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${c.PosX+sin*16},"Y":0,"Z":${c.PosY+cos*16}},"Radius":6.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":6,"During":4}`);
        postAoe(`{"Name":"本体地火4","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${c.PosX+sin*24},"Y":0,"Z":${c.PosY+cos*24}},"Radius":6.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":8,"During":4}`);
        postAoe(`{"Name":"本体地火5","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${c.PosX+sin*32},"Y":0,"Z":${c.PosY+cos*32}},"Radius":6.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":10,"During":4}`);
      },
      
    },
    
  ],
  
});
