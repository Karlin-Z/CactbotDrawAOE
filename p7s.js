

const aoeport = 9588;  //aoe监听的端口
function postAoe(data) {
  fetch(`http://127.0.0.1:${aoeport}/Add`, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: data
  });
}
const sendCommand = (command) => {
  callOverlayHandler({ call: 'PostNamazu', c: 'command', p: `${command}` });
}
// Calculate combatant position in an all 8 cards/intercards


Options.Triggers.push({
  zoneId: ZoneId.AbyssosTheSeventhCircleSavage,
  // zoneId: 979,
  initData: () => ({
    eggParse: 0,
    tetherSet: new Set(),
  }),
  triggers: [
    
    {
      id: 'P7S 生命的果实 处理器',
      // Collects combatantData of the eggs
      // combatant.BNpcNameID Mapping:
      //   11375 => Ios 电牛
      //   11376 => 鸟
      //   11377 => Minotaurs 牛头人
      // unhatchedEggs Mapping:
      //   0-5 are Minotaurs 牛头人 连线30度 不连线90度
      //   6-9 are 鸟
      //   10-12 are Ios 电牛 
      type: 'Ability',
      netRegex: { id: '7811', capture: false },
      preRun: (data) => data.eggParse = data.eggParse + 1,
      delaySeconds: 1,
      run: async (data) => {
        // Select the Forbidden Fruits
        const combatantData = await callOverlayHandler({
          call: 'getCombatants',
          names: '生命之果',
        });
        // if we could not retrieve combatant data, the
        // trigger will not work, so just resume promise here
        if (combatantData === null) {
          sendCommand(`/e 未获得生命之果单位`);
          return;
        }
        if (combatantData.combatants.length < 13) {
          sendCommand(`/e 生命之果单位小于13个`);
          return;
        }
        // Sort the combatants for parsing its role in the encounter
        const sortCombatants = (a, b) => (a.ID ?? 0) - (b.ID ?? 0);
        const sortedEgg = combatantData.combatants.sort(sortCombatants);
        // cactbot-builtin-response

        // Map of dirs to Platform locations
        // Note: Eggs may spawn in additional cardinals/intercardinals
        const dirToPlatform = {
          0: 'left',
          2: 'right',
          3: 'right',
          5: 'south',
          7: 'left',
        };
        // Platforms array used to filter for new platforms
        const platforms = ['right', 'left', 'south'];
        if (data.eggParse === 1) {
          // Find location of the north-most bird
          // Forbidden Fruit 1 uses last two birds
          if (sortedEgg[8] === undefined) {
            console.error(`生命果实1 未找到鸟蛋8`);
          }
          else {
            postAoe(`{"Name":"生命果实1 鸟8","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[8].ID},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);
          }
          if (sortedEgg[9] === undefined) {
            console.error(`生命果实1 未找到鸟蛋9`);
          }
          else {
            postAoe(`{"Name":"生命果实1 鸟9","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[9].ID},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);
          }
          if (sortedEgg[12] === undefined) {
            console.error(`生命果实1 未找到电牛12`);
          }
          else {
            postAoe(`{"Name":"生命果实","AoeType":"Circle","CentreType":"ActorId","CentreValue":${sortedEgg[12].ID},"Radius":10,"Color":1073807359,"Delay":0,"During":15}`);
          }
        }
        if (data.eggParse === 2) {
          if (sortedEgg[7] === undefined) {
            console.error(`生命果实2 未找到鸟蛋7`);
          }
          else {
            postAoe(`{"Name":"生命果实2 鸟7","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[7].ID},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);
          }
          if (sortedEgg[8] === undefined) {
            console.error(`生命果实2 未找到鸟蛋8`);
          }
          else {
            postAoe(`{"Name":"生命果实2 鸟8","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[8].ID},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);
          }
          if (sortedEgg[9] === undefined) {
            console.error(`生命果实2 未找到鸟蛋9`);
          }
          else {
            postAoe(`{"Name":"生命果实2 鸟9","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[9].ID},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);
          }
        }
        
        if (data.eggParse === 6) {
          if (sortedEgg[8] === undefined) {
            console.error(`生命果实6 未找到鸟蛋8`);
          }
          else {
            postAoe(`{"Name":"生命果实6 鸟8","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[8].ID},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);
          }
          if (sortedEgg[9] === undefined) {
            console.error(`生命果实6 未找到鸟蛋9`);
          }
          else {
            postAoe(`{"Name":"生命果实6 鸟9","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[9].ID},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);
          }
          if (sortedEgg[12] === undefined) {
            console.error(`生命果实6 未找到电牛12`);
          }
          else {
            postAoe(`{"Name":"生命果实6 牛12","AoeType":"Circle","CentreType":"ActorId","CentreValue":${sortedEgg[12].ID},"Radius":10,"Color":1073807359,"Delay":0,"During":15}`);
          }
        }
        if (data.eggParse === 7) {
          if (sortedEgg[8] === undefined) {
            console.error(`生命果实7 未找到鸟蛋8`);
          }
          else {
            postAoe(`{"Name":"生命果实7 鸟8","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[8].ID},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);
          }
          if (sortedEgg[9] === undefined) {
            console.error(`生命果实7 未找到鸟蛋9`);
          }
          else {
            postAoe(`{"Name":"生命果实7 鸟9","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[9].ID},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);
          }
        }
        if (data.eggParse === 8) {
          for (let i = 2; i < 6; i++) {
            if (sortedEgg[i] === undefined) {
              console.error($`生命果实8 未找到牛头${i}`);
            }
            else {
              postAoe(`{"Name":"Rect Example","AoeType":"Sector","CentreType":"ActorId","CentreValue":${sortedEgg[i].ID},"TrackType":"Nearest","TrackValue":1,"Radius":40,"Angle":90,"Rotation":0.0,"Color":1073807359,"Delay":19,"Delay":3}`);
            }
          }
          if (sortedEgg[8] === undefined) {
            console.error(`生命果实8 未找到鸟蛋8`);
          }
          else {
            postAoe(`{"Name":"生命果实8 鸟8","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[8].ID},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);
          }
          if (sortedEgg[9] === undefined) {
            console.error(`生命果实8 未找到鸟蛋9`);
          }
          else {
            postAoe(`{"Name":"生命果实8 鸟9","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[9].ID},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);
          }

        }
        if (data.eggParse === 8) {
          
          if (sortedEgg[8] === undefined) {
            console.error(`生命果实8 未找到鸟蛋8`);
          }
          else {
            postAoe(`{"Name":"生命果实8 鸟8","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[8].ID},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);
          }
          if (sortedEgg[9] === undefined) {
            console.error(`生命果实8 未找到鸟蛋9`);
          }
          else {
            postAoe(`{"Name":"生命果实8 鸟9","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[9].ID},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);
          }

        }
        //可能不对
        
      },
    },
    {
      id: 'P7S 生命果实 连线记录清除器',
      type: 'StartsUsing',
      netRegex: { id: '7811', capture: false },
      run: async (data, matches) => {
        data.tetherSet = new Set();
      },
    },

    {
      id: 'P7S 生命果实 连线处理器',

      // 0001 0039 Minotaur 牛头人 Tether
      // 0006 Io 电牛
      // 0011 鸟 Tether
      // Forbidden Fruit 4: 4 Bull Tethers, 2 Minotaur Tethers, 1 Non-tethered Minotaur
      // Famine: 4 Minotaur Tethers, 2 Non-tethered Minotaurs, 2 Static Birds
      // Death: 2 Bulls with Tethers, 1 Bull casting Puddle AoE, 2 Static Birds
      // War: 4 Bull Tethers, 2 Minotaur Tethers, 2 Bird Tethers
      // TODO: Get locations with OverlayPlugin via X, Y and bird headings?
      type: 'Tether',
      netRegex: { id: ['0001', '0006', '0039', '0011'] },
      delaySeconds: 0.1,
      run: (data, matches) => {
        if (data.tetherSet.has(matches.targetId)) {
          return;
        }
        data.tetherSet.add(matches.targetId);
        if (data.eggParse === 4) {
          switch (matches.id) {
            case '0001':
            case '0039':
              postAoe(`{"Name":"生命果实4 连线牛头人","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Radius":40,"Angle":90,"Rotation":0.0,"Color":1073807359,"Delay":5,"Delay":4}`);
              break;
            case '0006':
              postAoe(`{"Name":"Rect Example","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":5,"During":4}`);
            default:
              break;
          }
        }
        if (data.eggParse === 5) {
          switch (matches.id) {
            case '0011':
              postAoe(`{"Name":"Rect Example","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":9}`);
              break;
            default:
              break;
          }
        }
        
        if (data.eggParse === 9){
          if(matches.id==='0006')
          {
            postAoe(`{"Name":"Rect Example","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":5,"During":4}`);
          }

        }
        if (data.eggParse === 10){
          switch (matches.id) {
            case '0001':
            case '0039':
              postAoe(`{"Name":"生命果实10 连线牛头人","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Radius":40,"Angle":90,"Rotation":0.0,"Color":1073807359,"Delay":5,"Delay":4}`);
              break;
            case '0006':
              postAoe(`{"Name":"生命果实10 连线牛头人","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":5,"During":4}`);
              break;
            case '0011':
              postAoe(`{"Name":"Rect Example","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":5,"During":4}`);
              break;
            default:
              break;
          }
        }

      },
    },
    {
      id: 'P7S 分摊死刑',
      type: 'StartsUsing',
      netRegex: { id: '7836' },
      run: async (data, matches) => {
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let tid = result.combatants[0].TargetID;
        postAoe(`{"Name":"Circle Example","AoeType":"Circle","CentreType":"ActorId","CentreValue":${tid},"Radius":6,"Color":1073807359,"Delay":0,"During":8}`)
      },
    },
    {
      id: 'P7S 分散死刑',
      type: 'StartsUsing',
      netRegex: { id: '7835', capture: false },
      run: (data, matches) => {
        data.party.roleToPartyNames_['tank'].forEach(name => {
          console.log("a");
          postAoe(`{"Name":"分摊死刑","AoeType":"Circle","CentreType":"ActorName","CentreValue":"${name}","Radius":6,"Color":1073807359,"Delay":0,"During":8}`);
        });
      },

    },
    {
      id: 'P7S 地火',
      type: 'StartsUsing',
      netRegex: { id: '782F' },
      condition: (data) => data.eggParse === 0,
      // netRegex: { id: '85'},
      run: async (data, matches) => {
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let c = result.combatants[0];
        let head = result.combatants[0].Heading;
        var dx = Math.sin(c.Heading) * 7;
        var dz = Math.cos(c.Heading) * 7;
        for (let i = 0; i < 8; i++) {
          postAoe(`{"Name":"地火","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${c.PosX + i * dx},"Y":${c.PosZ},"Z":${c.PosY + i * dz}},"Radius":7,"Color":1073807359,"Delay":0,"During":21}`);

        }
      },
    },
    {
      id: 'P7S 奶妈分摊',
      type: 'StartsUsing',
      netRegex: { id: '783B' },
      run: async (data, matches) => {
        postAoe(`{"Name":"奶妈分摊","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":6,"Color":1073807104,"Delay":0,"During":5.7}`);
      },
    },
    {
      id: 'P7S 前场双拳',
      type: 'StartsUsing',
      netRegex: { id: '7821', capture: false },
      run: async (data, matches) => {
        postAoe(`{"Name":"前场双拳1","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":114.29,"Y":0,"Z":91.75},"Radius":19,"Color":1073807359,"Delay":0,"During":7}`);
        postAoe(`{"Name":"前场双拳3","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":85.71,"Y":0,"Z":91.75},"Radius":19,"Color":1073807359,"Delay":0,"During":7}`);
      },
    },
    {
      id: 'P7S 后场单拳',
      type: 'StartsUsing',
      netRegex: { id: '7827', capture: false },
      run: async (data, matches) => {
        postAoe(`{"Name":"后场单拳","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":116.5},"Radius":25,"Color":1073807359,"Delay":0,"During":7}`);

      },
    },
    {
      //右冲拳，左安全 宽25长50
      id: 'P7S 冲拳',
      type: 'StartsUsing',
      netRegex: { id: '7825', },
      run: async (data, matches) => {
        postAoe(`{"Name":"冲拳","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":40,"Width":25,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":5}`);
      },
    },
    {id: 'P7S 魔印创造 处理器',
      type: 'GainsEffect',
      // CEC/D45 = Inviolate Winds
      // CED/D56 = Holy Bonds
      netRegex: { effectId: ['CEC', 'CED', 'D45', 'D56'] },
      run: async (data, matches) => {
        // switch (matches.effectId) {
        //   case 'CEC':
        //     postAoe(`{"Name":"魔印创造1风","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":7,"Color":1073807359,"Delay":0,"During":9}`);
        //     break;
        //   case 'CED':
        //     postAoe(`{"Name":"魔印创造1圣","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":6,"Color":1073807104,"Delay":0,"During":9}`);
        //     break;
        //   case 'D45':
        //     postAoe(`{"Name":"魔印创造2风","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":7,"Color":1073807359,"Delay":15,"During":5}`);
        //     break;
        //   case 'D56':
        //     postAoe(`{"Name":"魔印创造2圣","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":6,"Color":1073807104,"Delay":15,"During":5}`);
        //     break;
        //   default:
        //     break;
        // }

      },
    },
    {id: 'P7S 魔印创造·狱 处理器',
      type: 'GainsEffect',
      // CEE = Purgatory Winds I
      // D3F = Purgatory Winds II
      // D40 = Purgatory Winds III
      // D41 = Purgatory Winds IV
      // CEF = Holy Purgation I
      // D42 = Holy Purgation II
      // D43 = Holy Purgation III
      // D44 = Holy Purgation IV
      netRegex: { effectId: ['CE[EF]', 'D3F', 'D4[01234]'] },
      run: (data, matches) => {
        // switch (matches.effectId) {
        //   case 'CEE':
        //     postAoe(`{"Name":"魔印创造·狱1风","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":7,"Color":1073807359,"Delay":5,"During":5}`);
        //     break;
        //   case 'D3F':
        //     postAoe(`{"Name":"魔印创造·狱2风","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":7,"Color":1073807359,"Delay":20,"During":5}`);
        //     break;
        //   case 'D40':
        //     postAoe(`{"Name":"魔印创造·狱3风","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":7,"Color":1073807359,"Delay":35,"During":5}`);
        //     break;
        //   case 'D41':
        //     postAoe(`{"Name":"魔印创造·狱4风","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":7,"Color":1073807359,"Delay":50,"During":5}`);
        //     break;
        //   case 'CEF':
        //     postAoe(`{"Name":"魔印创造·狱1圣","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":6,"Color":1073807104,"Delay":5,"During":5}`);
        //     break;
        //   case 'D42':
        //     postAoe(`{"Name":"魔印创造·狱1圣","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":6,"Color":1073807104,"Delay":20,"During":5}`);
        //     break;
        //   case 'D43':
        //     postAoe(`{"Name":"魔印创造·狱1圣","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":6,"Color":1073807104,"Delay":35,"During":5}`);
        //     break;
        //   case 'D44':
        //     postAoe(`{"Name":"魔印创造·狱1圣","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":6,"Color":1073807104,"Delay":50,"During":5}`);
        //     break;
        //   default:
        //     break;
        // }
      },
    },
    {
      id: 'P7S 魔印创造·狱 地面AOE',
      type: 'StartsUsing',
      netRegex: { id: ['7820', '781F'] },
      run: async (data, matches) => {
        switch (matches.id) {
          case '7820':
            postAoe(`{"Name":"魔印创造·狱 地面月环","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":30,"InnerRadius":5.0,"Color":1073807359,"Delay":5,"During":8.7}`);
            break;
          case '781F':
            postAoe(`{"Name":"魔印创造·狱 地面钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":25,"Color":1073807359,"Delay":5,"During":8.7}`);
            break;
          default:
            break;
        }
      },
    },
    {
      //鸟连线
      id: 'P7S 鸟连线 防击退',
      type: 'Tether',
      netRegex: { id: '0011', source: '未成熟的铁爪怪鸟' },
      // ~9s between tether and Bronze Bellows (no cast) in all cases.
      delaySeconds: 4,
      // Just give this to everyone.  People in towers or elsewhere can be safe.
      run: (data, matches) => {
        if (matches.target == data.me) {
          sendCommand('/ac 亲疏自行');
          sendCommand('/ac 沉稳咏唱');
        }
      },
    },
    {
      //击退
      id: 'P7S 半神飙风 防击退',
      type: 'StartsUsing',
      netRegex: { id: '7A0B', capture: false },
      delaySeconds: 1,
      run: (data, matches) => {
        sendCommand('/ac 亲疏自行');
        sendCommand('/ac 沉稳咏唱');
      },
    },
  ],

});
