const 死刑范围 = true;
const 辣翅辣尾范围 = true;
const 双龙凤冲范围 = true;
const 地板火范围 = true;
const 炎蛇群翔范围 = true;
const 延时核爆范围=true;
const 普通核爆范围=true;

const 兽变身自动防击退 = true;
const 蛇变身钢铁作图 = true;
const 蛇石化背对 = true;
const 石眼范围=true;
const 石眼范围仅显示自己=true;
const 蛇毒范围=true;
const 蛇毒范围仅显示自己=true;
const 第二次蛇直线AOE范围=true;

const 人形态2诱导范围=true;


//位置带单引号 MT ST H1 H2 D1 D2 D3 D4
const 位置 = 'MT';
const 足球东西击退辅助 = true;
const 足球南北击退辅助 = true;
const 足球第四下击退预测 = true;

const 火圈范围 = true;






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


const centerX = 100;
const centerY = 100;

const positionTo8Dir = (combatant) => {
  const x = combatant.PosX - centerX;
  const y = combatant.PosY - centerY;
  // Dirs: N = 0, NE = 1, ..., NW = 7
  return Math.round(4 - 4 * Math.atan2(x, y) / Math.PI) % 8;
};
const headingTo8Dir = (heading) => {
  // Dirs: N = 0, NE = 1, ..., NW = 7
  return (2 - Math.round(heading * 8 / Math.PI) / 2 + 2) % 8;
};

const arcaneChannelFlags = '00020001'; // mapEffect flags for tower tile effect
Options.Triggers.push({
  zoneId: ZoneId.AbyssosTheEighthCircleSavage,
  initData: () => {
    return {
      足球计数: 0,
      足球分摊: '',
      足球击退大圈: [],
      足球击退大圈位置: [],
      火圈单位:[],
      存储核爆:'',
    };
  },
  triggers: [
    // ---------------- Part 1 ----------------
    {id: 'P8S 门神 地板火',
      type: 'StartsUsing',
      netRegex: { id: '7927' },
      run: async (data, matches) => {
        if (!地板火范围) return;
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let posX = result.combatants[0].PosX;
        let posY = result.combatants[0].PosY - 5;
        postAoe(`{"Name":"门神地火","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":${posX},"Y":0,"Z":${posY}},"Length":10,"Width":10,"Rotation":0.0,"Color":1442840320,"Delay":0,"During":10}`);

      },
    },
    {//龙凤冲,需要确定和地板的相对时间，7910龙，7911凤
      id: 'P8S 门神 单龙凤冲',
      type: 'StartsUsing',
      netRegex: { id: '791[01]' },
      run: async (data, matches) => {
        if (!辣翅辣尾范围) return;
        if (matches.id === '7910') {
          //龙
          postAoe(`{"Name":"单龙冲","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":80.0},"Length":40,"Width":14,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":8}`);
        }
        else {
          //凤
          postAoe(`{"Name":"单凤冲","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":86.5,"Y":0,"Z":80},"Length":40,"Width":13,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":8}`);
          postAoe(`{"Name":"单凤冲","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":113.5,"Y":0,"Z":80},"Length":40,"Width":13,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":8}`);
        }
      },
    },
   
    {id: 'P8S 门神 双龙凤冲',
      type: 'StartsUsing',
      netRegex: { id: '795[01]' },
      run: async (data, matches) => {
        if (!双龙凤冲范围) return;
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let posX = result.combatants[0].PosX;
        if (matches.id === '7950') {
          //龙
          if (Math.abs(posX - 100) > 2) {
            //侧
            postAoe(`{"Name":"龙凤冲 东西龙","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":80,"Y":0,"Z":100.0},"Length":40,"Width":14,"Rotation":-90.0,"Color":1073807359,"Delay":0,"During":8}`);
          } else {
            //前后
            postAoe(`{"Name":"龙凤冲 南北龙","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":80},"Length":40,"Width":14,"Rotation":0,"Color":1073807359,"Delay":0,"During":8}`);
          }
        }
        else {
          //凤
          if (Math.abs(posX - 100) > 2) {
            //侧
            postAoe(`{"Name":"龙凤冲 东西凤","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":80,"Y":0,"Z":86.5},"Length":40,"Width":13,"Rotation":-90,"Color":1073807359,"Delay":0,"During":8}`);
            postAoe(`{"Name":"龙凤冲 东西凤","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":80,"Y":0,"Z":113.5},"Length":40,"Width":13,"Rotation":-90,"Color":1073807359,"Delay":0,"During":8}`);
          } else {
            //前后
            postAoe(`{"Name":"龙凤冲 南北凤","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":86.5,"Y":0,"Z":80.0},"Length":40,"Width":13,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":8}`);
            postAoe(`{"Name":"龙凤冲 南北凤","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":113.5,"Y":0,"Z":80.0},"Length":40,"Width":13,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":8}`);

          }
        }
      },
    },
    {id: 'P8S 普通核爆范围',
      type: 'StartsUsing',
      netRegex: { id: ['791D','791E']},
      run: (data, matches) => {
        if (!延时核爆范围) return;
        if (matches.id === '791E') {
          data.party.roleToPartyNames_['dps'].forEach(name => {
            postAoe(`{"Name":"四分核爆","AoeType":"Circle","CentreType":"ActorName","CentreValue":"${name}","Radius":3,"Color":503381760,"Delay":0,"During":8}`);
          });
        }
        if (matches.id === '791D') {
          data.party.partyIds_.forEach(pid => {
            postAoe(`{"Name":"八分核爆","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${pid},"Radius":6,"Color":503382015,"Delay":0,"During":8}`);
          });
        }
      },
    },

    {id: 'P8S 门神 延时核爆范围',
    type: 'StartsUsing',
    netRegex: { id: '791[01]' },
    run: async (data, matches) => {
      if (!延时核爆范围) return;
      if (data.存储核爆==='7915') {
        data.party.roleToPartyNames_['dps'].forEach(name => {
          postAoe(`{"Name":"四分核爆之念","AoeType":"Circle","CentreType":"ActorName","CentreValue":"${name}","Radius":3,"Color":503381760,"Delay":0,"During":8}`);
        });
      }
      if (data.存储核爆==='7914') {
        data.party.partyIds_.forEach( pid => {
          postAoe(`{"Name":"八分核爆之念","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${pid},"Radius":6,"Color":503382015,"Delay":0,"During":8}`);
        }); 
      }
    },
    },
    {id: 'P8S 门神 死刑第一下',
      type: 'StartsUsing',
      netRegex: { id: '7945' },
      run: (data, matches) => {
        if (死刑范围) {
          postAoe(`{"Name":"门神 死刑第一下","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Length":40,"Width":5,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":5}`);
        }
      },
    },
    {id: 'P8S 门神 死刑第二下',
      type: 'Ability',
      netRegex: { id: '7945' },
      run: async (data, matches) => {
        if (!死刑范围) return;
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let tid = result.combatants[0].TargetID;
        postAoe(`{"Name":"神 死刑第二下","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":${tid},"Length":40,"Width":5,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":3.5}`);
      },
    },
    {id: 'P8S 延时核爆收集器',
      type: 'StartsUsing',
      // 7915 normally
      // 7916 during Blazing Footfalls
      netRegex: { id: ['7915','7914']},
      run: (data, matches) => {
        data.存储核爆=matches.id;
      },
      
    },
    {id: 'P8S 门神 兽变身防击退',
      type: 'Ability',
      // There is 6.4 seconds between this Reforged Reflection ability and the Footprint (7109) ability.
      netRegex: { id: '794B', capture: false },
      delaySeconds: 1.5,
      run: (data, matches) => {
        if (!兽变身自动防击退) return;
        sendCommand('/ac 亲疏自行');
        sendCommand('/ac 沉稳咏唱');
      },
    },
    {id: 'P8S 门神 蛇变身钢铁',
      type: 'StartsUsing',
      // This is the Reforged Reflection cast.
      netRegex: { id: '794C' },
      run: (data, matches) => {
        if (!蛇变身钢铁作图) return;
        postAoe(`{"Name":"变蛇钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":10,"Color":1073807359,"Delay":0,"During":10}`);
      },
    },
    {id: 'P8S 门神 炎蛇群翔',
      type: 'StartsUsing',
      // During clones.
      netRegex: { id: '791F' },
      run: async (data, matches) => {
        if (!炎蛇群翔范围) return;
        data.party.partyIds_.forEach(pid => {
          postAoe(`{"Name":"Rect Example","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${pid},"Length":40,"Width":5,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":6}`);

        });
      },
    },
    {id: 'P8S 蛇石化背对',
      type: 'StartsUsing',
      // We could call the very first one out immediately on the Added Combatant line,
      // but then we'd have to duplicate this.
      netRegex: { id: '792B' },
      run: async (data, matches) => {
        if (!蛇石化背对) return;
        postAoe(`{"Name":"Back Example","AoeType":"Back","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"SeeAngle":95,"Thikness":5,"Color":4294901964,"CorrectColor":4278255360,"Delay":0,"During":8}`);
      },
    },
    {id: 'P8S 石化扇形范围',
      // BBC = First in Line
      // BBD = Second in Line,
      // D17 = Eye of the Gorgon
      // D18 = Crown of the Gorgon
      // CFE = Blood of the Gorgon
      // CFF = Breath of the Gorgon
      type: 'GainsEffect',
      netRegex: { effectId: ['D17'] },
      condition: (data, matches) => {
        return (!石眼范围仅显示自己)||matches.target===data.me;
      },
      run: (data, matches) => {
        if(!石眼范围) return;
        let d=parseFloat(matches.duration)-3.5;
        postAoe(`{"Name":"石眼石化 ${matches.target}","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":25,"Angle":30,"Rotation":0.0,"Color":838926335,"Delay":${d},"During":3.5}`)
      },
    },
    {id: 'P8S 蛇毒范围',
      type: 'GainsEffect',
      netRegex: { effectId: 'CFE' },
      condition: (data, matches) => {
        return (!蛇毒范围仅显示自己)||matches.target===data.me;
        
      },
      run: (data, matches) => {
        if(!蛇毒范围) return;
        let d=parseFloat(matches.duration)-3.5;
        postAoe(`{"Name":"蛇毒范围 ${matches.target}","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":5,"Color":503382015,"Delay":${d},"During":3.5}`)
      },
    },
    {id: 'P8S 人形态2诱导直条',
      type: 'Ability',
      netRegex: { id: '72CE'},
      run: (data, matches) => {
        if(!人形态2诱导范围) return;
        postAoe(`{"Name":"Rect Example","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":100},"TrackType":"Nearest","TrackValue":4,"Length":60,"Width":5,"Rotation":0.0,"Color":671154175,"Delay":0,"During":4}`)
      },
    },
    {id: 'P8S 火蛇范围 第一次',
      type: 'StartsUsing',
      netRegex: { id: '7925' },
      // Sometimes these initial positions are incorrect, so compensate with some delay.
      // TODO: can we detect/ignore these incorrect initial positions??
      delaySeconds: 0.5,
      run: async (data, matches) => {
        data.火圈单位.push(matches);
        if(!火圈范围) return;
        postAoe(`{"Name":"火蛇1 火圈","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":23,"Color":838926335,"Delay":0,"During":5}`);
        postAoe(`{"Name":"火蛇1 火圈","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":23,"Color":838926335,"Delay":0,"During":5}`);
      },
    },
    {id: 'P8S 火蛇范围 第二第三次',
      type: 'Ability',
      netRegex: { id: ['7923', '7924'] },
      run: async (data, matches) => {
        if(!火圈范围) return;
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        // Dirs: N = 0, NE = 1, ..., NW = 7
        const x = result.combatants[0].PosX - 100;
        const y = result.combatants[0].PosY - 100;
        const originalPos = positionTo8Dir(result.combatants[0]);
        const heading = headingTo8Dir(result.combatants[0].Heading);
        if (
          originalPos === 7 && heading === 2 ||
          originalPos === 3 && heading === 0 ||
          originalPos === 5 && heading === 1
        ) {
          //飞去东北角
          postAoe(`{"Name":"火蛇2 东北火圈","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":115,"Y":0,"Z":85},"Radius":23,"Color":503382015,"Delay":0,"During":9}`);
        } 
        if (
          originalPos === 1 && heading === 4 ||
          originalPos === 5 && heading === 2 ||
          originalPos === 7 && heading === 3
        ) {
          //飞去东南角
          postAoe(`{"Name":"火蛇2 东南火圈","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":115,"Y":0,"Z":115},"Radius":23,"Color":503382015,"Delay":0,"During":9}`);
        }
        if (
          originalPos === 3 && heading === 6 ||
          originalPos === 1 && heading === 5 ||
          originalPos === 7 && heading === 4
        ) {
          //飞去西南角
          postAoe(`{"Name":"火蛇2 西南火圈","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":85,"Y":0,"Z":115},"Radius":23,"Color":503382015,"Delay":0,"During":9}`);        
        } 
        if (
          originalPos === 5 && heading === 0 ||
          originalPos === 1 && heading === 6 ||
          originalPos === 3 && heading === 7
        ) {
          //飞去西北角
          postAoe(`{"Name":"火蛇2 西北火圈","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":85,"Y":0,"Z":85},"Radius":23,"Color":503382015,"Delay":0,"During":9}`);        
        }
      },
      
    },
    {id: 'P8S 门神 踢足球二四分摊收集器',
      type: 'StartsUsing',
      netRegex: { id: ['7916', '7917'] },
      run: (data, matches) => {
        data.足球分摊=matches.id;
      },
    },
    {id: 'P8S 踢足球 收集器',
      // 793B Trailblaze Shown 直线击退
      // 793D Quadrupedal Crush Shown大圈
      // 793C Quadrupedal Impact Shown击退
      // These are shown in the span of 8.5s
      // Blazing Footfalls takes 14.5s to complete +4s to resolve Torch Flames
      type: 'StartsUsing',
      netRegex: { id: ['793C', '793D']},
      alert:async (data, matches) => {
        data.足球计数++;
        console.log(data.足球计数);
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        const x = result.combatants[0].PosX - 100;
        const y = result.combatants[0].PosY - 100;
        // 0 = N, 1 = E, etc
        const dir = Math.round(2 - 2 * Math.atan2(x, y) / Math.PI) % 4;

        data.足球击退大圈.push(matches.id);
        data.足球击退大圈位置.push(dir);
        if (data.足球计数 === 1) {
          //击退到东西
          if (data.足球击退大圈[0] === '739C' && data.足球击退大圈位置[0] === 1) {
            return '先向东击退';
          }
          if (data.足球击退大圈[0] === '739C' && data.足球击退大圈位置[0] === 3) {
            return '先向西击退';
          }
          if (data.足球击退大圈[0] === '739D' && data.足球击退大圈位置[0] === 1) {
            return '先向西击退';
          }
          if (data.足球击退大圈[0] === '739D' && data.足球击退大圈位置[0] === 3) {
            return '先向东击退';
          }
        }
        if (data.足球计数 === 2) {
          if (data.足球击退大圈[1] === '739C' && data.足球击退大圈位置[1] === 0) {
            return '再去A点';
          }
          if (data.足球击退大圈[1] === '739C' && data.足球击退大圈位置[1] === 2) {
            return '再去C点';
          }
          if (data.足球击退大圈[1] === '739D' && data.足球击退大圈位置[1] === 0) {
            return '再去C点';
          }
          if (data.足球击退大圈[1] === '739D' && data.足球击退大圈位置[1] === 2) {
            return '再去A点';
          }
        }
      },
      run: (data, matches) => {
        if (data.足球计数 === 1 && 足球东西击退辅助)
        {
          if (data.足球击退大圈[0] === '739C' && data.足球击退大圈位置[0] === 1) {
            consol.log(`{"Name":"东西击退 中","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":80.0},"Length":40,"Width":14,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":8}`);          
            consol.log(`{"Name":"东西击退 左","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":86.5,"Y":80,"Z":0.0},"Length":40,"Width":13,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":8}`);            
          }
          if (data.足球击退大圈[0] === '739C' && data.足球击退大圈位置[0] === 3) {
            consol.log(`{"Name":"东西击退 中","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":80.0},"Length":40,"Width":14,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":8}`);          
            consol.log(`{"Name":"东西击退 右","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":113.5,"Y":80,"Z":0.0},"Length":40,"Width":13,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":8}`);          
          }
          if (data.足球击退大圈[0] === '739D' && data.足球击退大圈位置[0] === 1) {
            consol.log(`{"Name":"东西击退 中","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":80.0},"Length":40,"Width":14,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":8}`);          
            consol.log(`{"Name":"东西击退 右","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":113.5,"Y":80,"Z":0.0},"Length":40,"Width":13,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":8}`);                    
          }
          if (data.足球击退大圈[0] === '739D' && data.足球击退大圈位置[0] === 3) {
            consol.log(`{"Name":"东西击退 中","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":80.0},"Length":40,"Width":14,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":8}`);          
            consol.log(`{"Name":"东西击退 左","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":86.5,"Y":80,"Z":0.0},"Length":40,"Width":13,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":8}`);            
          }
        }
        if (data.足球计数 === 2 && 足球南北击退辅助) {
          //接击退
          if (data.足球击退大圈[1] === '739C' && data.足球击退大圈位置[1] === 0) {
            consol.log(`{"Name":"南北击退 北","AoeType":"Link","CentreType":"ActorName","CentreValue":"${data.me}","Centre2Type":"PostionValue","Centre2Value":{"X":100,"Y":0,"Z":91},"Thikness":5,"Color":4278255360,"Delay":8,"During":5.7}`);
          }
          if (data.足球击退大圈[1] === '739C' && data.足球击退大圈位置[1] === 2) {
            consol.log(`{"Name":"南北击退 南","AoeType":"Link","CentreType":"ActorName","CentreValue":"${data.me}","Centre2Type":"PostionValue","Centre2Value":{"X":100,"Y":0,"Z":109},"Thikness":5,"Color":4278255360,"Delay":8,"During":5.7}`);
          }

          //接大圈
          if (data.足球击退大圈[1] === '739D' && data.足球击退大圈位置[1] === 0) {
            consol.log(`{"Name":"南北击退 南","AoeType":"Link","CentreType":"ActorName","CentreValue":"${data.me}","Centre2Type":"PostionValue","Centre2Value":{"X":100,"Y":0,"Z":109},"Thikness":5,"Color":4278255360,"Delay":8,"During":5.7}`);
          }
          if (data.足球击退大圈[1] === '739D' && data.足球击退大圈位置[1] === 2) {
            consol.log(`{"Name":"南北击退 北","AoeType":"Link","CentreType":"ActorName","CentreValue":"${data.me}","Centre2Type":"PostionValue","Centre2Value":{"X":100,"Y":0,"Z":91},"Thikness":5,"Color":4278255360,"Delay":8,"During":5.7}`);
          }
        }
        if (data.足球计数 === 2 && 足球第四下击退预测) {
          //接击退
          if (data.足球击退大圈[1] === '739C' && data.足球击退大圈位置[1] === 0) {
            consol.log(`{"Name":"击退预测 北中心","AoeType":"Repel","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":120},"Length":16,"Thikness":5,"Color":4278255360,"Delay":13.7,"During":3}`);
          }
          if (data.足球击退大圈[1] === '739C' && data.足球击退大圈位置[1] === 2) {
            consol.log(`{"Name":"击退预测 南中心","AoeType":"Repel","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":80},"Length":16,"Thikness":5,"Color":4278255360,"Delay":13.7,"During":3}`);
          }
        }

      },
    },
    {id: 'P8S 第二次兽变身击退/大圈',
      // 7A04 Quadrupedal Impact
      // 7A05 Quadrupedal Crush
      type: 'StartsUsing',
      netRegex: { id: ['7A04', '7A05']},
      run: async (data, matches) => {
        // select the Hephaistoss with same source id
        let hephaistosData = null;
        hephaistosData = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        // if we could not retrieve combatant data, the
        // trigger will not work, so just resume promise here
        if (hephaistosData === null) {
          console.error(`Hephaistos: null data`);
          return;
        }
        if (hephaistosData.combatants.length !== 1) {
          console.error(`Hephaistos: expected 1, got ${hephaistosData.combatants.length}`);
          return;
        }
        const hephaistos = hephaistosData.combatants[0];
        if (!hephaistos)
          return;
        // Boss faces 3.14159274 or -3.13727832 when North
        // Flip callout if crush (7A05)
        const epsilon = 0.1;
        if (Math.abs(Math.abs(hephaistos.Heading) - 3.14) < epsilon)
        {
          if (matches.id === '7A05') {
            //北大圈
            postAoe(`{"Name":"兽形态2 开场北大圈","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":80.0},"Radius":30,"Color":503382015,"Delay":0,"During":5.5}`);
          } else {
            //北击退
            postAoe(`{"Name":"兽形态2 开场北击退","AoeType":"Repel","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":80.0},"Length":30,"Thikness":5,"Color":4278255360,"Delay":0,"During":5.5}`);
          }
        }
        // Boss will be facing South
        else{
          if (matches.id === '7A05')
          {
            //南大圈
            postAoe(`{"Name":"兽形态2 开场南大圈","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":120.0},"Radius":30,"Color":503382015,"Delay":0,"During":5.5}`);
          }else {
            //南击退
            postAoe(`{"Name":"兽形态2 开场南击退","AoeType":"Repel","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":120.0},"Length":30,"Thikness":5,"Color":4278255360,"Delay":0,"During":5.5}`);
          }
        }
          
      },
    },
    {id: 'P8S 第二次蛇直线AOE',
      type: 'StartsUsing',
      netRegex: { id: '7932' },
      run: (data, matches) => {
        if(!第二次蛇直线AOE范围) return;
        postAoe(`{"Name":"Rect Example","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":60,"Width":10,"Rotation":0.0,"Color":671154175,"Delay":0,"During":6}`)
      },
      
    },


    //791E 四分核爆
    //7915 四分核爆之念
    //7919 四分核爆之现

    //791D 八分核爆
    //7914 八分核爆之念
    //7918 八分核爆之现

    
    


    
    
    
    
    

    
    
    

    
    
    
    
    
    // // ---------------- Part 2 ----------------
    // {//aoe
    //   id: 'P8S Aioniopyr',
    //   type: 'StartsUsing',
    //   netRegex: { id: '79DF', source: 'Hephaistos', capture: false },
    //   infoText: (_data, _matches, output) => output.text(),
    //   outputStrings: {
    //     text: {
    //       en: 'aoe + bleed',
    //       de: 'AoE + Blutung',
    //       fr: 'AoE + Saignement',
    //       ja: 'AOE + 出血',
    //       cn: 'AOE + 流血',
    //       ko: '전체 공격 + 도트',
    //     },
    //   },
    // },
    // {//分散死刑
    //   id: 'P8S Tyrant\'s Unholy Darkness',
    //   type: 'StartsUsing',
    //   // Untargeted, with 79DE damage after.
    //   netRegex: { id: '79DD', source: 'Hephaistos', capture: false },
    //   alertText: (_data, _matches, output) => output.text(),
    //   outputStrings: {
    //     text: {
    //       en: 'Split Tankbusters',
    //       de: 'getrennte Tankbuster',
    //       fr: 'Séparez les Tankbuster',
    //       ja: '2人同時タンク強攻撃',
    //       cn: '分散死刑',
    //       ko: '따로맞는 탱버',
    //     },
    //   },
    // },
    // {//左刀
    //   id: 'P8S Ashing Blaze Right',
    //   type: 'StartsUsing',
    //   netRegex: { id: '79D7', source: 'Hephaistos', capture: false },
    //   alertText: (data, _matches, output) => {
    //     if (data.firstAlignmentSecondAbility === 'stack')
    //       return output.rightAndStack();
    //     if (data.firstAlignmentSecondAbility === 'spread')
    //       return output.rightAndSpread();
    //     return output.right();
    //   },
    //   run: (data) => delete data.firstAlignmentSecondAbility,
    //   outputStrings: {
    //     right: Outputs.right,
    //     rightAndSpread: {
    //       en: 'Right + Spread',
    //       de: 'Rechts + Verteilen',
    //       fr: 'Droite + Écartez-vous',
    //       ja: '右 + 散会',
    //       cn: '右 + 分散',
    //       ko: '오른쪽 + 산개',
    //     },
    //     rightAndStack: {
    //       en: 'Right + Stack',
    //       de: 'Rechts + Sammeln',
    //       fr: 'Droite + Package',
    //       ja: '右 + 頭割り',
    //       cn: '右 + 分摊',
    //       ko: '오른쪽 + 쉐어',
    //     },
    //   },
    // },
    // {//右刀
    //   id: 'P8S Ashing Blaze Left',
    //   type: 'StartsUsing',
    //   netRegex: { id: '79D8', source: 'Hephaistos', capture: false },
    //   alertText: (data, _matches, output) => {
    //     if (data.firstAlignmentSecondAbility === 'stack')
    //       return output.leftAndStack();
    //     if (data.firstAlignmentSecondAbility === 'spread')
    //       return output.leftAndSpread();
    //     return output.left();
    //   },
    //   run: (data) => delete data.firstAlignmentSecondAbility,
    //   outputStrings: {
    //     left: Outputs.left,
    //     leftAndSpread: {
    //       en: 'Left + Spread',
    //       de: 'Links + Verteilen',
    //       fr: 'Gauche + Écartez-vous',
    //       ja: '左 + 散会',
    //       cn: '左 + 分散',
    //       ko: '왼쪽 + 산개',
    //     },
    //     leftAndStack: {
    //       en: 'Left + Stack',
    //       de: 'Links + Sammeln',
    //       fr: 'Gauche + Package',
    //       ja: '左 + 頭割り',
    //       cn: '左 + 分摊',
    //       ko: '왼쪽 + 쉐어',
    //     },
    //   },
    // },
    // {//概念支配
    //   id: 'P8S High Concept',
    //   type: 'StartsUsing',
    //   netRegex: { id: '79AC', source: 'Hephaistos', capture: false },
    //   response: Responses.bigAoe(),
    //   run: (data) => {
    //     data.concept = {};
    //     data.splicer = {};
    //   },
    // },


    // {//小怪冲
    //   id: 'P8S Illusory Hephaistos End of Days',
    //   type: 'StartsUsing',
    //   netRegex: { id: '7A8B' },
    //   infoText: (_data, matches, output) => {
    //     // Illusory Hephaistos are at x=(80 or 120), y=(85 or 95 or 105 or 115).
    //     // Either the first or second row is always free.
    //     const y = parseFloat(matches.y);
    //     const epsilon = 2;
    //     const row1y = 85;
    //     const row2y = 95;
    //     // TODO: combine this with the ice/fire/stack/spread calls too?
    //     if (Math.abs(y - row1y) < epsilon)
    //       return output.row2();
    //     if (Math.abs(y - row2y) < epsilon)
    //       return output.row1();
    //   },
    //   outputStrings: {
    //     row1: {
    //       en: 'Front Row',
    //       de: 'Vordere Reihe',
    //       fr: 'Première rangée',
    //       ja: '1列目',
    //       cn: '第 1 行',
    //       ko: '첫번째 줄',
    //     },
    //     row2: {
    //       en: 'Second Row',
    //       de: 'Zweite Reihe',
    //       fr: 'Deuxième rangée',
    //       ja: '2列目',
    //       cn: '第 2 行',
    //       ko: '두번째 줄',
    //     },
    //   },
    // },


    // {//万象灰烬
    //   id: 'P8S Limitless Desolation',
    //   type: 'StartsUsing',
    //   netRegex: { id: '75ED', source: 'Hephaistos', capture: false },
    //   response: Responses.spread('alert'),
    // },

    // {//支配者一击，软狂暴
    //   id: 'P8S Dominion',
    //   type: 'StartsUsing',
    //   netRegex: { id: '79D9', source: 'Hephaistos', capture: false },
    //   response: Responses.spread('alert'),
    //   run: (data) => data.deformationTargets = [],
    // },

    // {
    //   id: 'P8S Aionagonia',
    //   type: 'StartsUsing',
    //   netRegex: { id: '7A22', source: 'Hephaistos', capture: false },
    //   alertText: (_data, _matches, output) => output.text(),
    //   outputStrings: {
    //     text: {
    //       en: 'big aoe + bleed',
    //       de: 'große AoE + Blutung',
    //       fr: 'Grosse AoE + Saignement',
    //       ja: '全体攻撃 + 出血',
    //       cn: '大AOE+流血',
    //       ko: '아픈 전체공격 + 도트',
    //     },
    //   },
    // },
  ],

});
