//在此进行设置
const 捕食作图=true;
const 捕食踩圈点标记=true;
const 捕食踩圈点='A';//B C D

const 前后刀作图=true;
const 双重冲击作图=true;
const 双重冲击自动防击退=true;
const 狂怒爪击灼热射线作图=true;

const 红宝石之光1作图=true;
const 红宝石之光2作图=true;
const 红宝石之光3作图=true;
const 红宝石之光4作图=true;
const 红宝石之光5作图=true;
const 红宝石之光6作图=true;

const 分散分摊显示分散Aoe=true;




// TODO: Callout safe quadrant/half for Venom Pool with Crystals
const directions = ['NW', 'NE', 'SE', 'SW'];
const convertCoordinatesToDirection = (x, y) => {
  if (x > 100)
    return y < 100 ? 'NE' : 'SE';
  return y < 100 ? 'NW' : 'SW';
};
const unsafeDirectionPos = (x, y) => {
  if (x > 100)
    return y < 100 ? '{"X":107.5,"Y":-300,"Z":85}' : '{"X":107.5,"Y":-300,"Z":100}';
  return y < 100 ? '{"X":92.5,"Y":-300,"Z":85}' : '{"X":92.5,"Y":-300,"Z":100}';
};
const posTo8part = (x, y) => {
  let posX = x - 100;
  let posY = 100 - y;
  return Math.floor((Math.atan2(posX, posY) / Math.PI + 2) % 2 * 4);
}
const aoeport = 9588;  //aoe监听的端口
function postAoe(data) {
  fetch(`http://127.0.0.1:${aoeport}/DrawAoe`, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: data
  });
}
function postAoeNew(data) {
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

function RotationVector(posx,posy,rot)
{
  
  let newVec = Math.atan2(posx - 100, posy - 100) - rot/180*Math.PI;
  return { x:Math.cos(newVec) * 11.66 + 100,
           y:Math.sin(newVec) * 11.66 + 100 }
}
Options.Triggers.push({
  zoneId: ZoneId.AbyssosTheFifthCircleSavage,
  initData: () => {
    return {
      RubyParse: 0,
      红宝石之光4方向: '',
      红宝石之光4Dic: { 'NE': 0, 'SE': 0, 'SW': 0, 'NW': 0 },
      红宝石之光6Dic: {},
      捕食Count: 0,
    };
  },
  triggers: [

    {
      id: 'P5S 红宝石之光计数器',
      type: 'StartsUsing',
      netRegex: { id: '76F3' },
      suppressSeconds: 1,
      run: (data, matches) => {
        data.RubyParse++;
      },
    },
    {id: 'P5S 红宝石之光1',
      type: 'Ability',
      netRegex: { id: '76FE' },
      // disabled: true,
      condition: (data, matches) => data.RubyParse === 1,
      run: (data, matches) => {
        if (!红宝石之光1作图) return;
        let posX = parseFloat(matches.x);
        let posY = parseFloat(matches.y);
        if (Math.abs(Math.abs(posX - 100) - Math.abs(posY - 100)) < 0.5) {
          //26s 范围待定
          // postAoe('{"AoeType":1,"PostionType":1,"ActorId":0x'+matches.sourceId+',"OuterRadius":15,"Color":838926335,"Delay":0.0,"During":22}');
          postAoe(`{"AoeType":1,"PostionType":3,"Postion":{"X":${posX},"Y":-300,"Z":${posY}},"OuterRadius":12,"Color":1291845887,"Delay":0.0,"During":22}`);
        }
        else {
          postAoe(`{"AoeType":3,"PostionType":3,"Postion":${unsafeDirectionPos(posX, posY)},"TrackMode":1,"Rotation":0.0,"Length":15,"Width":15,"Color":1677787135,"Delay":0.0,"During":17.5}`);
        }


      },
    },
    {id: 'P5S 红宝石之光2',
      type: 'StartsUsing',
      netRegex: { id: '79FE' },
      // disabled: true,
      condition: (data, matches) => data.RubyParse === 2,
      run: async (data, matches) => {
        if (!红宝石之光2作图) return;
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        postAoe(`{"AoeType":1,"PostionType":3,"Postion":{"X":${duPosX},"Y":-300,"Z":${duPosY}},"OuterRadius":12,"Color":1291845887,"Delay":0.0,"During":22}`);
        let r8 = posTo8part(result.combatants[0].posX, result.combatants[0].PosY);
        let rr = 45;
        if (r8 === 2 || r8 === 7) {
          rr = -135;
        }
        if (r8 === 0 || r8 === 5) {
          rr = 135;
        }
        if (r8 === 1 || r8 === 4) {
          rr = -45;
        }
        postAoe(`{"AoeType":3,"PostionType":3,"Postion":{"X":100,"Y":-300,"Z":100},"TrackMode":1,"Rotation":${rr},"Length":30,"Width":42,"Color":1291845887,"Delay":9,"During":3}`);
      },
    },
    {id: 'P5S 红宝石之光3',
      type: 'StartsUsing',
      netRegex: { id: '79FF' },
      // disabled: true,
      run: async (data, matches) => {
        if (!红宝石之光3作图) return;
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let posX = result.combatants[0].PosX;
        let posY = result.combatants[0].PosY;
        postAoe(`{"AoeType":3,"PostionType":3,"Postion":${unsafeDirectionPos(posX, posY)},"TrackMode":1,"Rotation":0.0,"Length":15,"Width":15,"Color":1677787135,"Delay":7,"During":2.5}`);

      },
    },
    {id: 'P5S 红宝石之光4 毒圈',
      type: 'NetworkCancelAbility',
      netRegex: { id: '79FE' },
      condition: (data, matches) => data.RubyParse === 4,
      run: async (data, matches) => {
        if (!红宝石之光4作图) return;
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let posX = result.combatants[0].PosX;
        let posY = result.combatants[0].PosY;
        // postAoe('{"AoeType":1,"PostionType":1,"ActorId":0x'+matches.sourceId+',"OuterRadius":12,"Color":838926335,"Delay":0.0,"During":26}');
        postAoe(`{"AoeType":1,"PostionType":3,"Postion":{"X":${posX},"Y":-300,"Z":${posY}},"OuterRadius":12,"Color":1291845887,"Delay":0.0,"During":22}`);
      },
    },
    {id: 'P5S 红宝石之光4方向',
      type: 'StartsUsing',
      netRegex: { id: '76FE' },
      condition: (data, matches) => data.RubyParse === 4,
      run: async (data, matches) => {
        if (!红宝石之光4作图) return;
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });

        let posX = result.combatants[0].PosX;
        let posY = result.combatants[0].PosY;
        let posXr = posX - 100;
        let posYr = posY - 100;
        if (Math.sqrt(posXr * posXr + posYr * posYr) < 10) {
          let r8 = posTo8part(posX, posY);
          if (r8 === 0 || r8 === 1 || r8 === 4 || r8 === 5) {
            data.红宝石之光4方向 = 'NE';
          } else {
            data.红宝石之光4方向 = 'NW';
          }
        }
      },
    },
    {id: 'P5S 红宝石之光4计算',
      type: 'StartsUsing',
      netRegex: { id: '76FE' },
      delaySeconds: 0.2,
      condition: (data, matches) => data.RubyParse === 4,
      run: async (data, matches) => {
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let posX = result.combatants[0].PosX;
        let posY = result.combatants[0].PosY;
        console.log(`${matches.sourceId}|${matches.x}|${matches.y}::${result.combatants[0].ID.toString(16)}|${posX}|${posY}`);
        let posXr = posX - 100;
        let posYr = posY - 100;
        if (Math.sqrt(posXr * posXr + posYr * posYr) > 10) {
          let r8 = posTo8part(posX, posY);
          if (data.红宝石之光4方向 === 'NE') {
            if (r8 === 0 || r8 === 7 || r8 === 6 || r8 === 5) {
              data.红宝石之光4Dic['NW']++;
            } else {
              data.红宝石之光4Dic['SE']++;
            }
          } else {
            if (r8 === 7 || r8 === 0 || r8 === 1 || r8 === 2) {
              data.红宝石之光4Dic['NE']++;
            } else {
              data.红宝石之光4Dic['SW']++;
            }
          }

        }
      },
    },
    {id: 'P5S 红宝石之光4反射',
      type: 'StartsUsing',
      netRegex: { id: '76FE' },
      delaySeconds: 0.5,
      suppressSeconds: 1,
      condition: (data, matches) => data.RubyParse === 4,
      run: async (data, matches) => {
        if (!红宝石之光4作图) return;
        if (data.红宝石之光4Dic['SW'] === 2) {
          postAoe(`{"AoeType":3,"PostionType":3,"Postion":{"X":100,"Y":-300,"Z":100},"TrackMode":1,"Rotation":45,"Length":30,"Width":40,"Color":1291845887,"Delay":0,"During":17}`);
        }
        if (data.红宝石之光4Dic['NW'] === 2) {
          postAoe(`{"AoeType":3,"PostionType":3,"Postion":{"X":100,"Y":-300,"Z":100},"TrackMode":1,"Rotation":135,"Length":30,"Width":40,"Color":1291845887,"Delay":0,"During":17}`);
        }
        if (data.红宝石之光4Dic['NE'] === 2) {
          postAoe(`{"AoeType":3,"PostionType":3,"Postion":{"X":100,"Y":-300,"Z":100},"TrackMode":1,"Rotation":-135,"Length":30,"Width":40,"Color":1291845887,"Delay":0,"During":17}`);
        }
        if (data.红宝石之光4Dic['SE'] === 2) {
          postAoe(`{"AoeType":3,"PostionType":3,"Postion":{"X":100,"Y":-300,"Z":100},"TrackMode":1,"Rotation":-45,"Length":30,"Width":40,"Color":1291845887,"Delay":0,"During":17}`);
        }
      },
    },
    {id: 'P5S 红宝石之光5',
      type: 'StartsUsing',
      netRegex: { id: '76FE' },
      // disabled: true,
      condition: (data, matches) => data.RubyParse === 5,
      run: async (data, matches) => {
        if (!红宝石之光5作图) return;
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let posX = result.combatants[0].PosX;
        let posY = result.combatants[0].PosY;
        if (Math.abs(posX - 100) <= 1 || Math.abs(posY - 100) <= 1) {
          postAoe(`{"AoeType":3,"PostionType":3,"Postion":${unsafeDirectionPos(posX, posY)},"TrackMode":1,"Rotation":0.0,"Length":15,"Width":15,"Color":1677787135,"Delay":0,"During":17.5}`);
        } else {
          postAoe(`{"AoeType":1,"PostionType":3,"Postion":{"X":${posX},"Y":-300,"Z":${posY}},"OuterRadius":12,"Color":1291845887,"Delay":15,"During":7}`);
          // postAoe('{"AoeType":1,"PostionType":1,"ActorId":0x'+matches.sourceId+',"OuterRadius":12,"Color":838926335,"Delay":0.0,"During":22}');
        }

      },
    },
    {id: 'P5S 红宝石之光6',
      type: 'StartsUsing',
      netRegex: { id: '76FE' },
      // disabled: true,
      condition: (data, matches) => data.RubyParse === 6,
      run: async (data, matches) => {
        if (!红宝石之光6作图) return;
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let posX = result.combatants[0].PosX;
        let posY = result.combatants[0].PosY;
        data.红宝石之光6Dic[Math.floor(posTo8part(posX, posY) / 2)]++;
        if (data.红宝石之光6Dic[Math.floor(posTo8part(posX, posY) / 2)] == 3) {
          postAoe(`{"AoeType":3,"PostionType":3,"Postion":${unsafeDirectionPos(posX, posY)},"TrackMode":1,"Rotation":0.0,"Length":15,"Width":15,"Color":1677787135,"Delay":0.0,"During":17.5}`);
          postAoe(`{"AoeType":3,"PostionType":3,"Postion":${unsafeDirectionPos(200 - posX, posY)},"TrackMode":1,"Rotation":0.0,"Length":15,"Width":15,"Color":1677787135,"Delay":0.0,"During":17.5}`);
          postAoe(`{"AoeType":3,"PostionType":3,"Postion":${unsafeDirectionPos(posX, 200 - posY)},"TrackMode":1,"Rotation":0.0,"Length":15,"Width":15,"Color":1677787135,"Delay":0.0,"During":17.5}`);
        }
      },
    },
    {id: 'P5S 红宝石之光6 毒圈',
      type: 'NetworkCancelAbility',
      netRegex: { id: '79FE' },
      condition: (data, matches) => data.RubyParse === 6,
      run: async (data, matches) => {
        if (!红宝石之光6作图) return;
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let posX = result.combatants[0].PosX;
        let posY = result.combatants[0].PosY;
        // postAoe('{"AoeType":1,"PostionType":1,"ActorId":0x'+matches.sourceId+',"OuterRadius":12,"Color":838926335,"Delay":0.0,"During":26}');
        postAoe(`{"AoeType":1,"PostionType":3,"Postion":{"X":${posX},"Y":-300,"Z":${posY}},"OuterRadius":12,"Color":1291845887,"Delay":10,"During":12}`);
      },
    },
    {id: 'P5S 分散分摊三连击',
      type: 'StartsUsing',
      netRegex: { id: '771[67]' },
      // disabled: true,
      run: async (data, matches) => {
        if (!分散分摊显示分散Aoe) return;
        if (matches.id === '7716') {
          data.party.partyIds_.forEach(pids => {
            postAoe(`{"AoeType":1,"PostionType":1,"ActorId":0x${pids},"OuterRadius":5,"Color":1677787135,"Delay":5,"During":4}`);
          });
        }
        else {
          data.party.partyIds_.forEach(pids => {
            postAoe(`{"AoeType":1,"PostionType":1,"ActorId":0x${pids},"OuterRadius":5,"Color":1677787135,"Delay":14,"During":4}`);

          });
        }
      },
    },
    {id: 'P5S 双重冲击',
      type: 'StartsUsing',
      netRegex: { id: '771B' },
      // disabled: true,
      run: (data, matches) => {
        if (!双重冲击作图) return;
        postAoe(`{"AoeType":3,"PostionType":1,"ActorId":0x${matches.sourceId},"TrackMode":1,"Rotation":0.0,"Length":30,"Width":44,"Color":838926335,"Delay":0.0,"During":6}`);
      },
    },
    {id: 'P5S 双重冲击防击退',
      type: 'StartsUsing',
      netRegex: { id: '771B', capture: false },
      // disabled: true,
      delaySeconds: 4,
      run: (data, matches) => {
        if (!双重冲击自动防击退) return;
        sendCommand('/ac 亲疏自行');
        sendCommand('/ac 沉稳咏唱');
      },
    },
    {id: 'P5S 捕食8连跳',
      type: 'StartsUsing',
      netRegex: { id: '7A03' },
      // disabled: true,
      promise: async (data, matches) => {
        data.捕食Count++;
        if (捕食Count===1) {
          let result = await callOverlayHandler({
            call: 'getCombatants',
            ids: [parseInt(matches.sourceId, 16)],
          });
          data.捕食第一跳单位=result.combatants[0];
        }
        return;
      },
      run: async (data, matches) => {

        if (data.捕食Count === 1) {
          if (!捕食作图) return;
          let result = await callOverlayHandler({
            call: 'getCombatants',
            ids: [parseInt(matches.sourceId, 16)],
          });
          
          let posX = result.combatants[0].PosX;
          let posY = result.combatants[0].PosY;
          let end= RotationVector(posX,posY);
          postAoeNew(`{"Name":"捕食 第一跳","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${posX},"Y":${result.combatants[0].PosZ},"Z":${posY}},"Radius":12,"Color":838926335,"Delay":0,"During":1.5}`);
          postAoeNew(`{"Name":"捕食 第二跳","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${end.x},"Y":${result.combatants[0].PosZ},"Z":${end.y}},"Radius":12,"Color":838926335,"Delay":0,"During":2.8}`);
          
        }
        
        if (data.捕食Count === 3) {
          if (!捕食作图) return;
          let result = await callOverlayHandler({
            call: 'getCombatants',
            ids: [parseInt(matches.sourceId, 16)],
          });
          let a= (data.捕食第一跳单位.PosX+result.combatants[0].PosX)-200;
          let b= (data.捕食第一跳单位.PosY+result.combatants[0].PosY)-200;
          if (Math.abs(a)<2 && Math.abs(b)<2) {
            //顺时针
            
            let posX = result.combatants[0].PosX;
            let posY = result.combatants[0].PosY;
            let jump4 = RotationVector(posX, posY,90);
            let jump5 = RotationVector(jump4.x, jump4.y,-118.07);
            let jump6 = RotationVector(jump5.x, jump5.y,-90);
            let jump7 = RotationVector(jump6.x, jump6.y,-90);
            let jump8 = RotationVector(jump7.x, jump7.y,-90);
            postAoeNew(`{"Name":"捕食 第三跳","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${posX},"Y":${ result.combatants[0].PosZ},"Z":${posY}},"Radius":12,"Color":838926335,"Delay":0,"During":1.5}`);
            postAoeNew(`{"Name":"捕食 第四跳","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${jump4.x},"Y":${result.combatants[0].PosZ},"Z":${jump4.y}},"Radius":12,"Color":838926335,"Delay":0,"During":2.8}`);
            postAoeNew(`{"Name":"捕食 第五跳","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${jump5.x},"Y":${result.combatants[0].PosZ},"Z":${jump5.y}},"Radius":12,"Color":838926335,"Delay":1.3,"During":2.8}`);
            postAoeNew(`{"Name":"捕食 第六跳","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${jump6.x},"Y":${result.combatants[0].PosZ},"Z":${jump6.y}},"Radius":12,"Color":838926335,"Delay":2.6,"During":2.8}`);
            postAoeNew(`{"Name":"捕食 第七跳","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${jump7.x},"Y":${result.combatants[0].PosZ},"Z":${jump7.y}},"Radius":12,"Color":838926335,"Delay":3.9,"During":2.8}`);
            postAoeNew(`{"Name":"捕食 第八跳","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${jump8.x},"Y":${result.combatants[0].PosZ},"Z":${jump8.y}},"Radius":12,"Color":838926335,"Delay":5.2,"During":2.8}`);
            
            
          }else{
            //逆时针
            let posX = result.combatants[0].PosX;
            let posY = result.combatants[0].PosY;
            let jump4 = RotationVector(posX, posY,-90);
            let jump5 = RotationVector(jump4.x, jump4.y,-90);
            let jump6 = RotationVector(jump5.x, jump5.y,-90);
            let jump7 = RotationVector(jump6.x, jump6.y,118.07);
            let jump8 = RotationVector(jump7.x, jump7.y,90);
            postAoeNew(`{"Name":"捕食 第三跳","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${posX},"Y":${ result.combatants[0].PosZ},"Z":${posY}},"Radius":12,"Color":838926335,"Delay":0,"During":1.5}`);
            postAoeNew(`{"Name":"捕食 第四跳","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${jump4.x},"Y":${result.combatants[0].PosZ},"Z":${jump4.y}},"Radius":12,"Color":838926335,"Delay":0,"During":2.8}`);
            postAoeNew(`{"Name":"捕食 第五跳","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${jump5.x},"Y":${result.combatants[0].PosZ},"Z":${jump5.y}},"Radius":12,"Color":838926335,"Delay":1.3,"During":2.8}`);
            postAoeNew(`{"Name":"捕食 第六跳","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${jump6.x},"Y":${result.combatants[0].PosZ},"Z":${jump6.y}},"Radius":12,"Color":838926335,"Delay":2.6,"During":2.8}`);
            postAoeNew(`{"Name":"捕食 第七跳","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${jump7.x},"Y":${result.combatants[0].PosZ},"Z":${jump7.y}},"Radius":12,"Color":838926335,"Delay":3.9,"During":2.8}`);
            postAoeNew(`{"Name":"捕食 第八跳","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${jump8.x},"Y":${result.combatants[0].PosZ},"Z":${jump8.y}},"Radius":12,"Color":838926335,"Delay":5.2,"During":2.8}`);
          }
        }
        if (data.捕食Count === 8 && 捕食踩圈点标记) {
          switch (捕食踩圈点.toUpperCase()) {
            case 'A':
              postAoe(`{"AoeType":8,"PostionType":2,"ActorName":"${data.me}","PostionType2":3,"Postion2":{"X":100,"Y":-300,"Z":92},"Thickness":5.0,"Color":4278255360,"Delay":0.0,"During":4.5}`)
              break;
            case 'B':
              postAoe(`{"AoeType":8,"PostionType":2,"ActorName":"${data.me}","PostionType2":3,"Postion2":{"X":108,"Y":-300,"Z":100},"Thickness":5.0,"Color":4278255360,"Delay":0.0,"During":4.5}`)
              break;
            case 'C':
              postAoe(`{"AoeType":8,"PostionType":2,"ActorName":"${data.me}","PostionType2":3,"Postion2":{"X":100,"Y":-300,"Z":108},"Thickness":5.0,"Color":4278255360,"Delay":0.0,"During":4.5}`)
              break;
            case 'D':
              postAoe(`{"AoeType":8,"PostionType":2,"ActorName":"${data.me}","PostionType2":3,"Postion2":{"X":92,"Y":-300,"Z":100},"Thickness":5.0,"Color":4278255360,"Delay":0.0,"During":4.5}`)
              break;
            default:
              break;
          }
        }
      },
    },
    {id: 'P5S 狂怒爪击',
      type: 'StartsUsing',
      netRegex: { id: '76FA' },
      run: (data, matches) => {
        if (!狂怒爪击灼热射线作图) return;
        postAoe(`{"AoeType":3,"PostionType":1,"ActorId":0x${matches.sourceId},"TrackMode":1,"Rotation":0.0,"Length":40,"Width":40,"Color":838926335,"Delay":0.0,"During":4.7}`);
      },
    },
    {id: 'P5S 灼热射线',
      type: 'StartsUsing',
      netRegex: { id: '76[DF]7', },
      run: async (data, matches) => {
        if (!狂怒爪击灼热射线作图) return;
        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let posX = result.combatants[0].PosX;
        let posY = result.combatants[0].PosY;
        let r8 = posTo8part(posX, posY);
        postAoe(`{"AoeType":3,"PostionType":3,"Postion":{"X":100,"Y":-300,"Z":100},"TrackMode":1,"Rotation":${Math.floor(r8 / 2) * 90 - 135},"Length":30,"Width":42,"Color":1291845887,"Delay":0.0,"During":4.7}`);
      },
    },
    {id: 'P5S 尾爪连击',
      type: 'StartsUsing',
      netRegex: { id: '7712' },
      // disabled: true,
      run: (data, matches) => {
        if (!前后刀作图) return;
        postAoe(`{"AoeType":3,"PostionType":1,"ActorId":0x${matches.sourceId},"TrackMode":1,"Rotation":180,"Length":40,"Width":40,"Color":1291845887,"Delay":0.0,"During":5.2}`);
        postAoe(`{"AoeType":3,"PostionType":1,"ActorId":0x${matches.sourceId},"TrackMode":1,"Rotation":0,"Length":40,"Width":40,"Color":1291845887,"Delay":5.2,"During":6.8}`);

      },
    },

    {
      id: 'P5S 爪尾连击',
      type: 'StartsUsing',
      // disabled: true,
      netRegex: { id: '770E' },
      run: (data, matches) => {
        if (!前后刀作图) return;
        postAoe(`{"AoeType":3,"PostionType":1,"ActorId":0x${matches.sourceId},"TrackMode":1,"Rotation":0.0,"Length":40,"Width":40,"Color":1291845887,"Delay":0,"During":8.4}`);
        postAoe(`{"AoeType":3,"PostionType":1,"ActorId":0x${matches.sourceId},"TrackMode":1,"Rotation":180.0,"Length":40,"Width":40,"Color":1291845887,"Delay":8.4,"During":3.1}`);

      },
    },

  ],

});
