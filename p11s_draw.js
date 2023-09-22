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
      upheldTethers: [],
      lightDarkDebuff: {},
      lightDarkBuddy: {},
      lightDarkTether: {},
      cylinderCollect: [],
      styxCount: 4,
      busterTargets: [],
    };
  },
  triggers: [
    {
      id: 'P11S Headmarker Tracker',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data) => data.decOffset === undefined,
      suppressSeconds: 99999,
      // Unconditionally set the first headmarker here so that future triggers are conditional.
      run: (data, matches) => getHeadmarkerId(data, matches),
    },

    //分P
    {
      id: 'P11S Phase Tracker',
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

    
    
    {
      id: 'P11S Dike Clean',
      type: 'StartsUsing',
      netRegex: { id: ['8230', '822F'], capture: false },
      delaySeconds: 1,
      suppressSeconds: 1,
      run: (data) => data.busterTargets.length = 0,
    },

    // 陪审否决 光暗八方
    {
      id: 'P11S 陪审否决 光暗八方',
      type: 'StartsUsing',
      netRegex: { id: ['81E6','81E7']},
      run: (data, matches) => {
        for (let i = 0; i < 8; i++) {
          postAoe(`{"Name":"陪审否决 光暗八方 ${data.PartyInfos[i].Name}","AoeType":"Rect","CentreType":"ActorId","CentreValue":${matches.sourceId},"TrackType":"IdTrack","TrackValue":${data.PartyIds[i]},"Length":50,"Width":8,"Rotation":0.0,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":6}`);
        }
      },
    },
    {
      id: 'P11S 陪审否决 光八方 原地钢铁',
      type: 'Ability',
      netRegex: { id: '81E8'},
      suppressSeconds:1,
      run: async (data, matches) => {
        var cs = (await callOverlayHandler({
          call: 'getCombatants',
          ids: data.PartyIds,
        })).combatants;
        for (let i = 0; i < 8; i++) {
          postAoe(`{"Name":"陪审否决 光八方 原地钢铁${data.PartyInfos[i].Name}","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${cs[i].PosX},"Y":0,"Z":${cs[i].PosY}},"Radius":5,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":5}`);
        }
      },
    },
    {
      id: 'P11S 陪审否决 暗八方 原地月环',
      type: 'Ability',
      netRegex: { id: '81E9'},
      suppressSeconds:1,
      run: async (data, matches) => {
        var cs = (await callOverlayHandler({
          call: 'getCombatants',
          ids: data.PartyIds,
        })).combatants;
        for (let i = 0; i < 8; i++) {
          postAoe(`{"Name":"陪审否决 光八方 原地月环${data.PartyInfos[i].Name}","AoeType":"Donut","CentreType":"PostionValue","CentreValue":{"X":${cs[i].PosX},"Y":0,"Z":${cs[i].PosY}},"Radius":9,"InnerRadius":2,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":5}`);
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
        let dur=matches.id=='87D3' ? 7.7:11;
        postAoe(`{"Name":"维持否决 光 单独","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.维持否决光},"Radius":6,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":${dur}}`);
      },
    },
    {
      id: 'P11S 维持否决 光 钢铁',
      type: 'StartsUsing',
      netRegex: { id: '81F6'},
      run: (data, matches) => {
        postAoe(`{"Name":"维持否决 光 钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":13,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":3.5}`);
      },
    },
    //维持否决 暗
    {
      id: 'P11S 维持否决 暗',
      type: 'StartsUsing',
      netRegex: { id: ['87D4','87D1']},
      run: (data, matches) => {
        let dur=matches.id=='87D4' ? 7.7:11;
        postAoe(`{"Name":"维持否决 暗","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.维持否决暗},"Radius":13,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":${dur}}`);
      },
    },
    {
      id: 'P11S 维持否决 暗 月环',
      type: 'StartsUsing',
      netRegex: { id: '81F7'},
      run: (data, matches) => {
        postAoe(`{"Name":"P11S 维持否决 暗 月环","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":22,"InnerRadius":8,"Color":${data.triggerSetConfig.DangerAoeCol},"Delay":0,"During":3.5}`);
      },
    },
    //维持否决 光分摊
    {
      id: 'P11S 维持否决 光分摊',
      type: 'Ability',
      netRegex: { id: '81F2', capture: false },
      suppressSeconds: 5,
      run: async (data, matches) => {
        for (let i = 2; i < 4; i++) {
          postAoe(`{"Name":"P11S 维持否决 光分摊","AoeType":"Circle","CentreType":"ActorId","CentreValue":${data.PartyIds[i]},"Radius":6,"Color":${data.triggerSetConfig.SafeAoeCol},"Delay":0,"During":4.2}`);
        }
      },
      outputStrings: {
        text: {
          en: 'Out + Healer Stacks',
          de: 'Raus + Heiler Gruppen',
          fr: 'Extérieur + Package sur les heals',
          ja: '外側で + 4:4あたまわり',
          cn: '场外 + 治疗分摊',
          ko: '밖으로 + 힐러 그룹 쉐어',
        },
      },
    },
    
    {
      id: 'P11S Upheld Overruling Dark Followup',
      type: 'Ability',
      netRegex: { id: '81F3', capture: false },
      durationSeconds: 4,
      suppressSeconds: 5,
      infoText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          en: 'In + Partners',
          de: 'Rein + Partner',
          fr: 'Intérieur + Partenaires',
          ja: '内側で + ペア',
          cn: '场中 + 两人分摊',
          ko: '안으로 + 파트너',
        },
      },
    },

    
    //驳回否决 月环
    {
      id: 'P11S Upheld Ruling Dark Followup',
      type: 'Ability',
      netRegex: { id: '8221', capture: false },
      suppressSeconds: 5,
      infoText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Get in Donut',
          de: 'Geh in den Donut',
          fr: 'Intérieur du donut',
          ja: 'ドーナツの内側へ',
          cn: '进入月环',
          ko: '도넛 안으로',
        },
      },
    },
    //?????
    {
      id: 'P11S Dark Perimeter Followup',
      type: 'Ability',
      netRegex: { id: '8225', capture: false },
      condition: (data) => data.phase === 'letter',
      suppressSeconds: 5,
      response: Responses.getTowers('alert'),
    },

    // 分歧否决 光
    {
      id: 'P11S Divisive Overruling Light',
      type: 'StartsUsing',
      netRegex: { id: '81EC', source: 'Themis', capture: false },
      durationSeconds: 6,
      alertText: (_data, _matches, output) => output.text(),
      run: (data) => data.divisiveColor = 'light',
      outputStrings: {
        text: {
          en: 'Sides => Healer Stacks + Out',
          de: 'Seiten => Heiler Gruppen + Raus',
          fr: 'Côtés => Extérieur + Package sur les heals',
          ja: '横 => 外側で + 4:4あたまわり',
          cn: '两侧 => 治疗分摊 + 场外',
          ko: '양 옆 => 밖으로 + 힐러 그룹 쉐어',
        },
      },
    },
    // 分歧否决 暗
    {
      id: 'P11S Divisive Overruling Dark',
      type: 'StartsUsing',
      netRegex: { id: '81ED', source: 'Themis', capture: false },
      durationSeconds: 6,
      alertText: (_data, _matches, output) => output.text(),
      run: (data) => data.divisiveColor = 'dark',
      outputStrings: {
        text: {
          en: 'Sides => In + Partners',
          de: 'Seiten => Rein + Partner',
          fr: 'Côtés => Intérieur + Partenaires',
          ja: '横 => 内側で + ペア',
          cn: '两侧 => 两人分摊 + 场内',
          ko: '양 옆 => 안으로 + 파트너',
        },
      },
    },
    // 分歧否决 后续
    {
      id: 'P11S Divisive Overruling Dark Followup',
      type: 'Ability',
      netRegex: { id: '81EE', capture: false },
      durationSeconds: 4,
      suppressSeconds: 5,
      infoText: (data, _matches, output) => {
        if (data.divisiveColor === 'dark')
          return output.dark();
        if (data.divisiveColor === 'light')
          return output.light();
      },
      run: (data) => delete data.divisiveColor,
      outputStrings: {
        light: {
          en: 'Healer Stacks + Out',
          de: 'Heiler Gruppen + Raus',
          fr: 'Package sur les heals + Extérieur',
          ja: '4:4あたまわり + 外側へ',
          cn: '治疗分摊 + 场外',
          ko: '힐러 그룹 쉐어 + 밖으로',
        },
        dark: {
          en: 'In + Partners',
          de: 'Rein + Partner',
          fr: 'Intérieur + Partenaires',
          ja: '内側へ + ペア',
          cn: '场中 + 两人分摊',
          ko: '안으로 + 파트너',
        },
      },
    },
    {
      id: 'P11S Divisive Overruling Light Shadowed Messengers',
      type: 'StartsUsing',
      netRegex: { id: '87B3', source: 'Themis', capture: false },
      durationSeconds: 8,
      alertText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Healer Stacks + Out',
          de: 'Heiler Gruppen + Raus',
          fr: 'Extérieur + Package sur les heals',
          ja: '4:4あたまわり + 外側へ',
          cn: '治疗分摊 + 场外',
          ko: '힐러 그룹 쉐어 + 밖으로',
        },
      },
    },
    {
      id: 'P11S Divisive Overruling Dark Shadowed Messengers',
      type: 'StartsUsing',
      netRegex: { id: '87B4', source: 'Themis', capture: false },
      durationSeconds: 8,
      alertText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Partners + In',
          de: 'Partner + Rein',
          fr: 'Partenaires + Intérieur',
          ja: 'ペア + 内側へ',
          cn: '两人分摊 + 场内',
          ko: '파트너 + 안으로',
        },
      },
    },
    {
      id: 'P11S Dismissal Overruling Light',
      type: 'StartsUsing',
      netRegex: { id: '8784', source: 'Themis', capture: false },
      durationSeconds: 6,
      alertText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Knockback => Healer Stacks + Out',
          de: 'Rückstoß => Heiler Gruppen + Raus',
          fr: 'Poussée => Extérieur + Package sur les heals',
          ja: 'ノックバック => 外側で + 4:4あたまわり',
          cn: '击退 => 治疗分摊 + 场外',
          ko: '넉백 => 밖으로 + 힐러 그룹 쉐어',
        },
      },
    },
    {
      id: 'P11S Dismissal Overruling Light Followup',
      type: 'Ability',
      netRegex: { id: '8784', capture: false },
      durationSeconds: 4,
      suppressSeconds: 5,
      infoText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Healer Stacks + Out',
          de: 'Heiler Gruppen + Raus',
          fr: 'Package sur les heals + Extérieur',
          ja: '4:4あたまわり + 外側へ',
          cn: '治疗分摊 + 场外',
          ko: '힐러 그룹 쉐어 + 밖으로',
        },
      },
    },
    {
      id: 'P11S Dismissal Overruling Dark',
      type: 'StartsUsing',
      netRegex: { id: '8785', source: 'Themis', capture: false },
      durationSeconds: 6,
      alertText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Knockback => In + Partners',
          de: 'Rückstoß => Rein + Partner',
          fr: 'Poussée => Intérieur + Partenaires',
          ja: 'ノックバック => 内側で + ペア',
          cn: '击退 => 两人分摊 + 场内',
          ko: '넉백 => 안으로 + 파트너',
        },
      },
    },
    {
      id: 'P11S Dismissal Overruling Dark Followup',
      type: 'Ability',
      netRegex: { id: '8785', capture: false },
      durationSeconds: 4,
      suppressSeconds: 5,
      infoText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          en: 'In + Partners',
          de: 'Rein + Partner',
          fr: 'Intérieur + Partenaires',
          ja: '内側で + ペア',
          cn: '场中 + 两人分摊',
          ko: '안으로 + 파트너',
        },
      },
    },
    {
      id: 'P11S Arcane Revelation Light Portals',
      type: 'StartsUsing',
      netRegex: { id: '820D', source: 'Themis', capture: false },
      alertText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Go to Dark Portals',
          de: 'Geh zu einem Dunkel-Portal',
          fr: 'Allez vers les portails sombres',
          ja: 'やみの方へ',
          cn: '去暗门前',
          ko: '어둠 문 쪽으로',
        },
      },
    },
    {
      id: 'P11S Arcane Revelation Dark Portals',
      type: 'StartsUsing',
      netRegex: { id: '820E', source: 'Themis', capture: false },
      alertText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Go to Light Portals',
          de: 'Geh zu einem Licht-Portal',
          fr: 'Allez sur les portails de lumière',
          ja: 'ひかりの方へ',
          cn: '去光门前',
          ko: '빛 문 쪽으로',
        },
      },
    },
    {
      id: 'P11S Arcane Revelation Light Orbs',
      type: 'StartsUsing',
      netRegex: { id: '820F', source: 'Themis', capture: false },
      durationSeconds: 6,
      alertText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Rotate to Dark Orbs',
          de: 'Rotiere zu den dunklen Orbs',
          fr: 'Tournez vers les orbes sombres',
          ja: 'やみの玉の方へ',
          cn: '暗球侧安全',
          ko: '어둠 구슬 쪽으로',
        },
      },
    },
    {
      id: 'P11S Arcane Revelation Dark Orbs',
      type: 'StartsUsing',
      netRegex: { id: '8210', source: 'Themis', capture: false },
      durationSeconds: 6,
      alertText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Rotate to Light Orbs',
          de: 'Rotiere zu den licht Orbs',
          fr: 'Tournez vers les orbes de lumière',
          ja: 'ひかりの玉の方へ',
          cn: '光球侧安全',
          ko: '빛 구슬 쪽으로',
        },
      },
    },
    {
      id: 'P11S Dark and Light Buff Collect',
      type: 'GainsEffect',
      // DE1 = Light's Accord
      // DE2 = Dark's Accord
      // DE3 = Light's Discord
      // DE4 = Dark's Discord
      netRegex: { effectId: ['DE1', 'DE2', 'DE3', 'DE4'] },
      run: (data, matches) => {
        const isLight = matches.effectId === 'DE1' || matches.effectId === 'DE3';
        data.lightDarkDebuff[matches.target] = isLight ? 'light' : 'dark';
      },
    },
    {
      id: 'P11S Dark and Light Tether Collect',
      type: 'Tether',
      // 00EC = light far tether (correct)
      // 00ED = light far tether (too close)
      // 00EE = dark far tether (correct)
      // 00EF = dark far tether (too close)
      // 00F0 = near tether (correct)
      // 00F1 = near tether (too far)
      netRegex: { id: ['00EC', '00ED', '00EE', '00EF', '00F0', '00F1'] },
      run: (data, matches) => {
        const isNear = matches.id === '00F0' || matches.id === '00F1';
        const nearFarStr = isNear ? 'near' : 'far';
        data.lightDarkTether[matches.source] = data.lightDarkTether[matches.target] = nearFarStr;
        data.lightDarkBuddy[matches.source] = matches.target;
        data.lightDarkBuddy[matches.target] = matches.source;
      },
    },
    {
      id: 'P11S Dark and Light Tether Callout',
      type: 'Tether',
      netRegex: { id: ['00EC', '00ED', '00EE', '00EF', '00F0', '00F1'], capture: false },
      delaySeconds: 0.5,
      durationSeconds: 6,
      suppressSeconds: 9999,
      response: (data, _matches, output) => {
        // cactbot-builtin-response
        output.responseOutputStrings = {
          lightNear: {
            en: 'Light Near w/${player} (${role})',
            de: 'Licht Nahe w/${player} (${role})',
            fr: 'Lumière proche avec ${player} (${role})',
            ja: 'ひかりニア => ${player} (${role})',
            cn: '光靠近 => ${player} (${role})',
            ko: '빛 가까이 +${player} (${role})',
          },
          lightFar: {
            en: 'Light Far w/${player} (${role})',
            de: 'Licht Entfernt w/${player} (${role})',
            fr: 'Lumière éloignée avec ${player} (${role})',
            ja: 'ひかりファー => ${player} (${role})',
            cn: '光远离 => ${player} (${role})',
            ko: '빛 멀리 +${player} (${role})',
          },
          darkNear: {
            en: 'Dark Near w/${player} (${role})',
            de: 'Dunkel Nahe w/${player} (${role})',
            fr: 'Sombre proche avec ${player} (${role})',
            ja: 'やみニア => ${player} (${role})',
            cn: '暗靠近 => ${player} (${role})',
            ko: '어둠 가까이 +${player} (${role})',
          },
          darkFar: {
            en: 'Dark Far w/${player} (${role})',
            de: 'Dunkel Entfernt w/${player} (${role})',
            fr: 'Sombre éloigné avec ${player} (${role})',
            ja: 'やみファー => ${player} (${role})',
            cn: '暗远离 => ${player} (${role})',
            ko: '어둠 멀리 +${player} (${role})',
          },
          otherNear: {
            en: 'Other Near: ${player1}, ${player2}',
            de: 'Anderes Nahe: ${player1}, ${player2}',
            fr: 'Autre proche : ${player1}, ${player2}',
            ja: '他のペア: ${player1}, ${player2}',
            cn: '另一组靠近：${player1}, ${player2}',
            ko: '다른 가까이: ${player1}, ${player2}',
          },
          otherFar: {
            en: 'Other Far: ${player1}, ${player2}',
            de: 'Anderes Entfernt: ${player1}, ${player2}',
            fr: 'Autre éloigné : ${player1}, ${player2}',
            ja: '他のペア: ${player1}, ${player2}',
            cn: '另一组远离：${player1}, ${player2}',
            ko: '다른 멀리: ${player1}, ${player2}',
          },
          tank: Outputs.tank,
          healer: Outputs.healer,
          dps: Outputs.dps,
          unknown: Outputs.unknown,
        };
        const myColor = data.lightDarkDebuff[data.me];
        const myBuddy = data.lightDarkBuddy[data.me];
        const myLength = data.lightDarkTether[data.me];
        if (myColor === undefined || myBuddy === undefined || myLength === undefined) {
          // Heuristic for "is this a synthetic execution".
          // TODO: maybe we need a field on data for this?
          if (Object.keys(data.lightDarkDebuff).length === 0)
            return;
          console.log(`Dark and Light: missing data for ${data.me}`);
          console.log(`Dark and Light: lightDarkDebuff: ${JSON.stringify(data.lightDarkDebuff)}`);
          console.log(`Dark and Light: lightDarkBuddy: ${JSON.stringify(data.lightDarkBuddy)}`);
          console.log(`Dark and Light: lightDarkTether: ${JSON.stringify(data.lightDarkTether)}`);
          return;
        }
        let myBuddyRole;
        if (data.party.isDPS(myBuddy))
          myBuddyRole = output.dps();
        else if (data.party.isTank(myBuddy))
          myBuddyRole = output.tank();
        else if (data.party.isHealer(myBuddy))
          myBuddyRole = output.healer();
        else
          myBuddyRole = output.unknown();
        const myBuddyShort = data.ShortName(myBuddy);
        let alertText;
        if (myLength === 'near') {
          if (myColor === 'light')
            alertText = output.lightNear({ player: myBuddyShort, role: myBuddyRole });
          else
            alertText = output.darkNear({ player: myBuddyShort, role: myBuddyRole });
        } else {
          if (myColor === 'light')
            alertText = output.lightFar({ player: myBuddyShort, role: myBuddyRole });
          else
            alertText = output.darkFar({ player: myBuddyShort, role: myBuddyRole });
        }
        let infoText = undefined;
        const playerNames = Object.keys(data.lightDarkTether);
        const sameLength = playerNames.filter((x) => data.lightDarkTether[x] === myLength);
        const others = sameLength.filter((x) => x !== data.me && x !== myBuddy).sort();
        const [player1, player2] = others.map((x) => data.ShortName(x));
        if (player1 !== undefined && player2 !== undefined) {
          if (myLength === 'near')
            infoText = output.otherNear({ player1: player1, player2: player2 });
          else
            infoText = output.otherFar({ player1: player1, player2: player2 });
        }
        return { alertText: alertText, infoText: infoText };
      },
    },
    {
      id: 'P11S Twofold Revelation Light',
      type: 'StartsUsing',
      netRegex: { id: '8211', source: 'Themis', capture: false },
      alertText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Go to Dark Orb + Dark Portals',
          de: 'Geh zum dunklen Orb + dunkle Portale',
          fr: 'Allez vers l\'orbe sombre + Portail sombre',
          ja: 'やみ玉 + ポータル',
          cn: '去暗球 + 暗门',
          ko: '어둠 구슬 + 어둠 문',
        },
      },
    },
    {
      id: 'P11S Twofold Revelation Dark',
      type: 'StartsUsing',
      netRegex: { id: '8212', source: 'Themis', capture: false },
      alertText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Go to Light Orb + Light Portals',
          de: 'Geh zum hellen Orb + helle Portale',
          fr: 'Allez vers l\'orbe de lumière + Portail de lumière',
          ja: 'ひかり玉 ＋ ポータル',
          cn: '去光球 + 光门',
          ko: '빛 구슬 + 빛 문',
        },
      },
    },
    {
      id: 'P11S Lightstream Collect',
      type: 'HeadMarker',
      netRegex: { target: 'Arcane Cylinder' },
      condition: (data, matches) => {
        const id = getHeadmarkerId(data, matches);
        if (id !== headmarkers.orangeCW && id !== headmarkers.blueCCW)
          return false;
        data.cylinderCollect.push(matches);
        return data.cylinderCollect.length === 3;
      },
      alertText: (data, _matches, output) => {
        let cylinderValue = 0;
        // targetId is in hex, but that's still lexicographically sorted so no need to parseInt.
        const sortedCylinders = data.cylinderCollect.sort((a, b) => {
          return a.targetId.localeCompare(b.targetId);
        });
        const markers = sortedCylinders.map((m) => getHeadmarkerId(data, m));
        // Once sorted by id, the lasers will always be in NW, S, NE order.
        // Create a 3 digit binary value, Orange = 0, Blue = 1.
        // e.g. BBO = 110 = 6
        for (const marker of markers) {
          cylinderValue *= 2;
          if (marker === headmarkers.blueCCW)
            cylinderValue += 1;
        }
        // The safe spot is the one just CW of two reds or just CCW of two blues.
        // There's always two of one color and one of the other.
        const outputs = {
          0b000: undefined,
          0b001: output.northwest(),
          0b010: output.east(),
          0b011: output.northeast(),
          0b100: output.southwest(),
          0b101: output.west(),
          0b110: output.southeast(),
          0b111: undefined,
        };
        return outputs[cylinderValue];
      },
      run: (data) => data.cylinderCollect = [],
      outputStrings: {
        east: Outputs.east,
        northeast: Outputs.northeast,
        northwest: Outputs.northwest,
        southeast: Outputs.southeast,
        southwest: Outputs.southwest,
        west: Outputs.west,
      },
    },
    {
      id: 'P11S Styx Stack',
      type: 'StartsUsing',
      netRegex: { id: '8217', source: 'Themis', capture: false },
      preRun: (data) => {
        data.styxCount++;
      },
      infoText: (data, _matches, output) => output.text({ num: data.styxCount }),
      outputStrings: {
        text: {
          en: 'Stack (${num} times)',
          de: 'Sammeln (${num} Mal)',
          fr: 'Packez-vous (${num} fois)',
          ja: '頭割り（${num}回）',
          cn: '集合分摊 (${num}次)',
          ko: '쉐어뎀 (${num}번)',
        },
      },
    },
  ],
});
