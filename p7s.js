const 生命果实1鸟作图=true;
const 生命果实1牛作图=true;

const 生命果实2鸟作图=true;

const 生命果实4连线牛头人扇形作图=true;
const 生命果实4连线电牛矩形作图=true;

const 生命果实5连线鸟矩形作图=true;

const 生命果实6鸟作图=true;
const 生命果实6牛作图=true;

const 生命果实7鸟作图=true;

const 生命果实8鸟作图=true;

const 生命果实9鸟作图=true;
const 生命果实9连线电牛矩形作图=true;

const 生命果实10连线电牛矩形作图=true;
const 生命果实10连线鸟矩形作图=true;
const 生命果实10连线牛头人扇形作图=true;

const 死刑范围=true;
const 奶妈分摊作图=true;
const 前场双拳作图=true;
const 后场单拳作图=true;
const 左右冲拳作图=true;
const 魔印创造·狱大圈作图=true;

const 第一轮地火作图=true;
//第二轮只画一个便于脑死击退找点
const 第二轮地火作图=true;
const 第二轮地火击退分摊预测作图=true;
const 第二轮地火脑死法击退点左=true;
const 第二轮地火脑死法击退点右=true;

const 鸟连线自动防击退=true;
const 果实2自动防击退=true;






const aoeport = 9588;  //aoe监听的端口
function postAoe(data) {
  fetch(`http://127.0.0.1:${aoeport}/Add`, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: data
  });
}
function postAoeOld(data) {
  fetch(`http://127.0.0.1:${aoeport}/DrawAoe`, {
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
    
    {id: 'P7S 生命的果实 处理器',
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
      alertText: (data, matches) =>{
        if (data.eggParse===9) {
          if (data.role==='tank') {
            return 'T空走廊无敌'
          }
        }
        if (data.eggParse===10) {
          return '没鸟为12点'
        }
      },
      run: async (data) => {
        // Select the Forbidden Fruits
        const combatantData = await callOverlayHandler({
          call: 'getCombatants',
          names: ['生命之果'],
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
        if (data.eggParse === 1) {
          // Find location of the north-most bird
          // Forbidden Fruit 1 uses last two birds
          if (sortedEgg[8] !== undefined && 生命果实1鸟作图) {
            postAoe(`{"Name":"生命果实1 鸟8","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[8].ID},"Length":50,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);
          
          }
          if (sortedEgg[9] !== undefined && 生命果实1鸟作图) {
            postAoe(`{"Name":"生命果实1 鸟9","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[9].ID},"Length":50,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);
          
          }
          if (sortedEgg[12] !== undefined && 生命果实1牛作图) {
            postAoe(`{"Name":"生命果实","AoeType":"Circle","CentreType":"ActorId","CentreValue":${sortedEgg[12].ID},"Radius":10,"Color":1073807359,"Delay":0,"During":15}`);
          
          }
        }
        if (data.eggParse ===2) {
          if (sortedEgg[7] !== undefined && 生命果实2鸟作图) {
            postAoe(`{"Name":"生命果实2 鸟7","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[7].ID},"Length":50,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);          
          }          
          if (sortedEgg[8] !== undefined && 生命果实2鸟作图) {
            postAoe(`{"Name":"生命果实2 鸟8","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[8].ID},"Length":50,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);          
          }
          if (sortedEgg[9] !== undefined && 生命果实2鸟作图) {
            postAoe(`{"Name":"生命果实2 鸟9","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[9].ID},"Length":50,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);          
          }
        }
        
        if (data.eggParse === 6) {
          if (sortedEgg[8] !== undefined && 生命果实6鸟作图) {
            postAoe(`{"Name":"生命果实6 鸟8","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[8].ID},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);          
          }
          if (sortedEgg[9] !== undefined && 生命果实6鸟作图) {
            postAoe(`{"Name":"生命果实6 鸟9","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[9].ID},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);          
          }          
          if (sortedEgg[12] !== undefined && 生命果实6牛作图) {
            postAoe(`{"Name":"生命果实6 牛12","AoeType":"Circle","CentreType":"ActorId","CentreValue":${sortedEgg[12].ID},"Radius":10,"Color":1073807359,"Delay":0,"During":15}`);          
          }          
        }
        if (data.eggParse === 7) {
          if (sortedEgg[8] !== undefined && 生命果实7鸟作图) {
            postAoe(`{"Name":"生命果实7 鸟平台","AoeType":"Circle","CentreType":"ActorId","CentreValue":${sortedEgg[8].ID},"Radius":10,"Color":1073807359,"Delay":0,"During":15}`);
            postAoe(`{"Name":"生命果实7 鸟8","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[8].ID},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);          
          }
          if (sortedEgg[9] !== undefined && 生命果实7鸟作图) {
            postAoe(`{"Name":"生命果实7 鸟9","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[9].ID},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);
            postAoe(`{"Name":"生命果实7 鸟平台","AoeType":"Circle","CentreType":"ActorId","CentreValue":${sortedEgg[9].ID},"Radius":10,"Color":1073807359,"Delay":0,"During":15}`);
          }
          
        }
        if (data.eggParse === 8) {
          if (sortedEgg[8] !== undefined && 生命果实8鸟作图) {
            postAoe(`{"Name":"生命果实8 鸟8","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[8].ID},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);          
          }
          if (sortedEgg[9] !== undefined && 生命果实8鸟作图) {
            postAoe(`{"Name":"生命果实8 鸟9","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[9].ID},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);          
          }
        }
        if (data.eggParse === 9) {
          
          if (sortedEgg[8] !== undefined && 生命果实9鸟作图) {
            postAoe(`{"Name":"生命果实8 鸟8","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[8].ID},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);          
          }
          if (sortedEgg[9] !== undefined && 生命果实9鸟作图) {
            postAoe(`{"Name":"生命果实8 鸟9","AoeType":"Rect","CentreType":"ActorId","CentreValue":${sortedEgg[9].ID},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":15}`);          
          }
        }
        //可能不对
        
      },
    },
    {id: 'P7S 生命果实 连线记录清除器',
      type: 'StartsUsing',
      netRegex: { id: '7811', capture: false },
      run: async (data, matches) => {
        data.tetherSet = new Set();
      },
    },
    {id: 'P7S 生命果实 连线处理器',

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
      promise: (data, matches) => {

        let mark = matches.targetId;
        if (data.tetherSet.has(mark)) {
          return;
        }
        data.tetherSet.add(mark);
        return;
      },
      alertText: (data, matches) =>{
        if (matches.target===data.me) {
          if (data.eggParse === 4) {
            switch (matches.id) {
              case '0001':
              case '0039':
                return '连线牛头人 拉远';
              case '0006':
                return '连线电牛 靠近引导';
              default:
                break;
            }
          }
          if (data.eggParse === 5) {
            switch (matches.id) {
              case '0011':
                return '引导鸟';
              default:
                break;
            }
          }
          if (data.eggParse === 5) {
            switch (matches.id) {
              case '0001':
              case '0039':
                return '连线牛头人 拉远';
              default:
                break;
            }
          }
          if (data.eggParse === 8) {
            switch (matches.id) {
              case '0001':
              case '0039':
                return '连线牛头人 交叉拉';
              default:
                break;
            }
          }
          if (data.eggParse === 9){
            if(matches.id==='0006')
            {
              return '连线电牛 站位引导';
            }
  
          }
          if (data.eggParse === 10){
            switch (matches.id) {
              case '0001':
              case '0039':
                return '连线牛头人 拉远'
              case '0006':
                return '连线电牛 靠近引导'
              case '0011':
                return '连线鸟 靠近引导到场外'
              default:
                break;
            }
          }
        }
      },

      run: (data, matches) => {
        
        if (data.eggParse === 4) {
          switch (matches.id) {
            case '0001':
            case '0039':
              if (生命果实4连线牛头人扇形作图) {
                postAoe(`{"Name":"生命果实4 连线牛头人","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Radius":50,"Angle":30,"Rotation":0.0,"Color":1073807359,"Delay":5,"During":4}`);              
              }
              break;
            case '0006':
              if (生命果实4连线电牛矩形作图) {
                postAoe(`{"Name":"生命果实4 连线电牛","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":5,"During":4}`);
              }
              break;
            default:
              break;
          }
        }
        if (data.eggParse === 5) {
          switch (matches.id) {
            case '0011':
              if (生命果实5连线鸟矩形作图) {
                postAoe(`{"Name":"生命果实5 连线鸟","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":5,"During":4}`);
              }
              break;
            default:
              break;
          }
        }
        if (data.eggParse === 9){
          if(matches.id==='0006')
          {
            if (生命果实9连线电牛矩形作图) {
              postAoe(`{"Name":"生命果实9 连线电牛","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":5,"During":4}`);          
            }
          }

        }
        if (data.eggParse === 10){
          switch (matches.id) {
            case '0001':
            case '0039':
              if (生命果实10连线牛头人扇形作图) {
                postAoe(`{"Name":"生命果实10 连线牛头人","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Radius":40,"Angle":30,"Rotation":0.0,"Color":1073807359,"Delay":5,"During":4}`);              
              }
              break;
            case '0006':
              if (生命果实10连线电牛矩形作图) {
                postAoe(`{"Name":"生命果实10 连线电牛","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":5,"During":4}`);
              }
              break;
            case '0011':
              if (生命果实10连线鸟矩形作图) {
                postAoe(`{"Name":"生命果实10 连线鸟","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Length":40,"Width":8,"Rotation":0.0,"Color":1073807359,"Delay":5,"During":4}`);              
              }
              break;
            default:
              break;
          }
        }

      },
    },
    {id: 'P7S 分摊死刑',
      type: 'StartsUsing',
      netRegex: { id: '7836' },
      run: async (data, matches) => {
        if (!死刑范围) return;
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let tid = result.combatants[0].TargetID;
        postAoe(`{"Name":"Circle Example","AoeType":"Circle","CentreType":"ActorId","CentreValue":${tid},"Radius":6,"Color":1073807359,"Delay":0,"During":8}`)
      },
    },
    {id: 'P7S 分散死刑',
      type: 'StartsUsing',
      netRegex: { id: '7835', capture: false },
      run: (data, matches) => {
        if (!死刑范围) return;
        data.party.roleToPartyNames_['tank'].forEach(name => {
          postAoe(`{"Name":"分散死刑","AoeType":"Circle","CentreType":"ActorName","CentreValue":"${name}","Radius":6,"Color":1073807359,"Delay":0,"During":8}`);
        });
      },

    },
    
    {id: 'P7S 第一轮地火',
      type: 'StartsUsing',
      netRegex: { id: '782F' },
      condition: (data) => data.eggParse === 0,
      // netRegex: { id: '85'},
      run: async (data, matches) => {
        if (!第一轮地火作图) return;
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let c = result.combatants[0];
        var dx = Math.sin(c.Heading) * 7;
        var dz = Math.cos(c.Heading) * 7;
        postAoe(`{"Name":"地火","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${c.PosX + 0 * dx},"Y":${c.PosZ},"Z":${c.PosY + 0 * dz}},"Radius":7,"Color":1073807359,"Delay":0,"During":7.5}`);
        postAoe(`{"Name":"地火","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${c.PosX + 1 * dx},"Y":${c.PosZ},"Z":${c.PosY + 1 * dz}},"Radius":7,"Color":1073807359,"Delay":0,"During":9.5}`);
        postAoe(`{"Name":"地火","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${c.PosX + 6 * dx},"Y":${c.PosZ},"Z":${c.PosY + 6 * dz}},"Radius":7,"Color":1073807359,"Delay":0,"During":19.5}`);
        postAoe(`{"Name":"地火","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${c.PosX + 7 * dx},"Y":${c.PosZ},"Z":${c.PosY + 7 * dz}},"Radius":7,"Color":1073807359,"Delay":0,"During":21.5}`);        
      },
    },
    {id: 'P7S 第二轮地火',
      type: 'StartsUsing',
      netRegex: { id: '782F' },
      condition: (data) => data.eggParse === 4,
      // netRegex: { id: '85'},
      run: async (data, matches) => {
        if (!第二轮地火作图) return;
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let c = result.combatants[0];
        let head = result.combatants[0].Heading;
        var dx = Math.sin(c.Heading) * 7;
        var dz = Math.cos(c.Heading) * 7;
        postAoe(`{"Name":"地火","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${c.PosX + 2 * dx},"Y":${c.PosZ},"Z":${c.PosY + 2 * dz}},"Radius":7,"Color":1073807359,"Delay":2,"During":9.5}`);
      },
    },
    {id: 'P7S 奶妈分摊',
      type: 'StartsUsing',
      netRegex: { id: '783B' },
      run: async (data, matches) => {
        if(!奶妈分摊作图) return;
        postAoe(`{"Name":"奶妈分摊","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":6,"Color":1073807104,"Delay":0,"During":5.7}`);
      },
    },
    {id: 'P7S 前场双拳',
      type: 'StartsUsing',
      netRegex: { id: '7821', capture: false },
      run: async (data, matches) => {
        if(!前场双拳作图) return;
        postAoe(`{"Name":"前场双拳1","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":114.29,"Y":0,"Z":91.75},"Radius":19,"Color":1073807359,"Delay":0,"During":7}`);
        postAoe(`{"Name":"前场双拳3","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":85.71,"Y":0,"Z":91.75},"Radius":19,"Color":1073807359,"Delay":0,"During":7}`);
      },
    },
    {id: 'P7S 后场单拳',
      type: 'StartsUsing',
      netRegex: { id: '7827', capture: false },
      run: async (data, matches) => {
        if(!后场单拳作图) return;
        postAoe(`{"Name":"后场单拳","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":116.5},"Radius":25,"Color":1073807359,"Delay":0,"During":7}`);
      },
    },
    {id: 'P7S 冲拳',
      type: 'StartsUsing',
      netRegex: { id: '7825', },
      run: async (data, matches) => {
        if(!左右冲拳作图) return;
        postAoe(`{"Name":"冲拳","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":40,"Width":25,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":5}`);
      },
    },
    {//击退也许是16m
      id: 'P7S 击退预测',
      type: 'StartsUsing',
      netRegex: { id: '7834', },
      run: async (data, matches) => {
        if(!第二轮地火击退分摊预测作图) return;
        postAoeOld(`{"AoeType":5,"PostionType":3,"Postion":{"X":100,"Y":0.0,"Z":100},"Length":16,"Thickness":5.0,"Color":4278255544,"Delay":0.0,"During":10.0}`);
      },
    },
    {id: 'P7S 脑死法击退点',
      type: 'StartsUsing',
      netRegex: { id: '7834', },
      run: async (data, matches) => {
        let dis=2.8;
        //左
        if(第二轮地火脑死法击退点左)
        {
          let pos2x=Math.sin(-Math.PI/3*2)*dis+100;
          let pos2y=Math.cos(-Math.PI/3*2)*dis+100;
          postAoe(`{"Name":"击退点左","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${pos2x},"Y":0,"Z":${pos2y}},"Radius":0.15,"Color":2717974272,"Delay":0,"During":6}`);
      
        }
        if(第二轮地火脑死法击退点右)
        {
          let pos1x=Math.sin(Math.PI/3*2)*dis+100;
          let pos1y=Math.cos(Math.PI/3*2)*dis+100;
          postAoe(`{"Name":"击退点1","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${pos1x},"Y":0,"Z":${pos1y}},"Radius":0.15,"Color":2717974272,"Delay":0,"During":6}`);
        }
      },
    },
    {id: 'P7S 魔印创造·狱 地面AOE',
      type: 'StartsUsing',
      netRegex: { id: ['7820', '781F'] },
      run: async (data, matches) => {
        if (!魔印创造·狱大圈作图) return;
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
    {//鸟连线
      id: 'P7S 鸟连线 防击退',
      type: 'Tether',
      netRegex: { id: '0011', source: '未成熟的铁爪怪鸟' },
      // ~9s between tether and Bronze Bellows (no cast) in all cases.
      delaySeconds: 4,
      // Just give this to everyone.  People in towers or elsewhere can be safe.
      run: (data, matches) => {
        if (matches.target == data.me && 鸟连线自动防击退) {
          
          sendCommand('/ac 亲疏自行');
          sendCommand('/ac 沉稳咏唱');
        }
      },
    },
    {id: 'P7S 半神飙风 防击退',
      type: 'StartsUsing',
      netRegex: { id: '7A0B', capture: false },
      delaySeconds: 1,
      run: (data, matches) => {
        if (!果实2自动防击退) return
        sendCommand('/ac 亲疏自行');
        sendCommand('/ac 沉稳咏唱');
      },
    },
  ],

});
