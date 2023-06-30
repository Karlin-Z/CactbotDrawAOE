const bloomingWeltFlare = 'D9B';
const furiousWeltStack = 'D9C';
const stingingWeltSpread = 'D9D';
// First headmarker is tankbuster on MT
const firstHeadmarker = parseInt('0156', 16);
const getHeadmarkerId = (data, matches) => {
  if (typeof data.decOffset === 'undefined')
    data.decOffset = parseInt(matches.id, 16) - firstHeadmarker;
  return (parseInt(matches.id, 16) - data.decOffset).toString(16).toUpperCase().padStart(4, '0');
};

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

const sendCommand = (command) => {
  callOverlayHandler({ call: 'PostNamazu', c: 'command', p: `${command}` });
}
const aoeport = 9588;  //aoe监听的端口
function postAoe(data) {
  fetch(`http://127.0.0.1:${aoeport}/Add`, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: data
  });
}
function requestPartyList() {
  fetch(`http://127.0.0.1:${aoeport}/GetData`, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: "Team"
  });
}
Options.Triggers.push({
  id: 'MountOrdealsExtremeDraw',
  zoneId: ZoneId.MountOrdealsExtreme,
  initData: () => {
    return {
      dualfireTargets: [],
      flamespireClawCounter: 0,

      inner1:-1,
      inner2:-1,
      middleDic:[],
      outDic:[],
      minId:0,
    };
  },
  triggers: [
    {
      id: '获取小队列表 ',
      regex: /Debug FB:PartyList:(?<Str>[^:]*):End/,
      run: async (data, matches) => {
        data.partylist = JSON.parse(matches.Str);
      },
    },
    {
      id: 'RubicanteEx 头顶标志',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data) => data.decOffset === undefined,
      run: (data, matches) => {
        getHeadmarkerId(data, matches);
      },
    },
    //一仇死刑
    {
      id: 'RubicanteEx 一仇死刑',
      type: 'StartsUsing',
      netRegex: { id: '7D2D'},
      run: async (data, matches) => {
        requestPartyList();
        postAoe(`{"Name":"一仇死刑","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":4,"Color":1073807359,"Delay":0,"During":5}`);
      },
    },
    //万变水波
    {
      id: 'RubicanteEx 万变水波',
      type: 'StartsUsing',
      netRegex: { id: '7CFE'},
      run: async (data, matches) => {
          for (let i = 0; i < 8; i++) {
            postAoe(`{"Name":"万变水波","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":${data.partylist[i]},"Radius":20,"Angle":30,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":8}`);
          
          }
          // data.party.partyIds_.forEach( pid => {
          //   postAoe(`{"Name":"万变水波","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${pid},"Radius":20,"Angle":30,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":8}`);
          // }); 
      },
    },
    //火龙卷分散
    {
      id: 'RubicanteEx 火龙卷分散',
      type: 'StartsUsing',
      netRegex: { id: '7D02'},
      run: async (data, matches) => {
        postAoe(`{"Name":"火龙卷分散","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":5.0,"Color":503382015,"Delay":0,"During":5}`);
      },
    },
    //火龙卷分摊
    {
      id: 'RubicanteEx 小怪群怪点',
      type: 'Ability',
      netRegex: { id: '7D05'},
      run: async (data, matches) => {
        postAoe(`{"Name":"小怪群怪点1","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":95.14,"Y":0,"Z":101.6},"Radius":0.3,"Color":2147548928,"Delay":0,"During":30}`);
        postAoe(`{"Name":"小怪群怪点2","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":104.86,"Y":0,"Z":101.6},"Radius":0.3,"Color":2147548928,"Delay":0,"During":30}`);
      },
    },
    {
      id: 'RubicanteEx 万变水波',
      type: 'StartsUsing',
      netRegex: { id: '7CFE'},
      run: async (data, matches) => {
          for (let i = 0; i < 8; i++) {
            postAoe(`{"Name":"万变水波","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":${data.partylist[i]},"Radius":20,"Angle":30,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":8}`);
          
          }
          // data.party.partyIds_.forEach( pid => {
          //   postAoe(`{"Name":"万变水波","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${pid},"Radius":20,"Angle":30,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":8}`);
          // }); 
      },
    },
    //钢铁分散引导
    {
      id: 'RubicanteEx 钢铁分散引导',
      type: 'StartsUsing',
      netRegex: { id: '7D24'},
      run: async (data, matches) => {
        postAoe(`{"Name":"钢铁分散引导 钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":10,"Color":1073807359,"Delay":0,"During":5}`);
        for (let i = 0; i < 8; i++) {
          postAoe(`{"Name":"钢铁分散引导 引导","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":${data.partylist[i]},"Length":40,"Width":6,"Rotation":0.0,"Color":520093440,"Delay":0,"During":6}`);
        }
        // data.party.partyIds_.forEach( pid => {
        //   postAoe(`{"Name":"钢铁分散引导 引导","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${pid},"Length":40,"Width":6,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":6}`);
        // }); 
      },
    },
    //月环分散引导
    {
      id: 'RubicanteEx 月环分散引导',
      type: 'StartsUsing',
      netRegex: { id: '7D25'},
      run: async (data, matches) => {
        postAoe(`{"Name":"月环分散引导 月环","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":20,"InnerRadius":10,"Color":1073807359,"Delay":0,"During":5}`);
        for (let i = 0; i < 8; i++) {
          postAoe(`{"Name":"月环分散引导 引导","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":${data.partylist[i]},"Length":40,"Width":6,"Rotation":0.0,"Color":520093440,"Delay":0,"During":6}`);
        }
        // data.party.partyIds_.forEach( pid => {
        //   postAoe(`{"Name":"月环分散引导 引导","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${pid},"Length":40,"Width":6,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":6}`);
        // }); 
      },
    },
    //米子回马枪
    {
      id: 'RubicanteEx 米字回马枪',
      type: 'StartsUsing',
      netRegex: { id: '7D27'},
      run: async (data, matches) => {
        postAoe(`{"Name":"米字回马枪","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":60,"Width":6,"Rotation":0,"Color":520093440,"Delay":0,"During":6.5}`);
      },
    },
    {
      id: 'RubicanteEx 赤灭热波',
      type: 'StartsUsing',
      netRegex: { id: ['7D20','7d21']},
      run: async (data, matches) => {
        postAoe(`{"Name":"赤灭热波 半场","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":20,"Angle":180,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":7}`);
      },
    },
    {
      id: 'RubicanteEx 双T死刑',
      // These headmarkers come out just before the 72DE self-targeted cast.
      type: 'HeadMarker',
      netRegex: {},
      run: async (data, matches) => {
        const id = getHeadmarkerId(data, matches);
        if (id !== '00E6')
          return;
        postAoe(`{"Name":"双T死刑","AoeType":"Sector","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":100},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Radius":60,"Angle":120,"Rotation":0,"Color":1073807359,"Delay":0,"During":6}`);
      },
    },
    {
      id: 'RubicanteEx 十字叉字',
      type: 'MapEffect',
      netRegex: { location: '04', capture: true },
      suppressSeconds: 15,
      run: (_data, matches, output) => {
        const intercardFlags = [
          '02000200',
          '00200020',
          '00020002',
          '00800080',
        ];
        if (intercardFlags.includes(matches.flags))
        {
          postAoe(`{"Name":"十字火","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":80},"Length":40,"Width":12,"Rotation":0,"Color":1073807359,"Delay":0,"During":8}`);
          postAoe(`{"Name":"十字火","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":80,"Y":0,"Z":100},"Length":40,"Width":12,"Rotation":-90,"Color":1073807359,"Delay":0,"During":8}`);
      

        }else{
          postAoe(`{"Name":"叉字火","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":85.8578,"Y":0,"Z":85.8578},"Length":40,"Width":12,"Rotation":-45,"Color":1073807359,"Delay":0,"During":8}`);
          postAoe(`{"Name":"叉字火","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":114.1421,"Y":0,"Z":85.8578},"Length":40,"Width":12,"Rotation":45,"Color":1073807359,"Delay":0,"During":8}`);

        }
         
        
      },
    },


    {id: 'RubicanteEx 转盘旋转',
      // 21E: 内圈单线，以线为面向
      // 21F: 内圈直角，以直角逆时针方向的边为面向
      // 220: 内圈平角，以一边为面向
      // 221: 中间圈，以对称轴连续三条直线侧为面向 \ | /
      // 222：外圈，固定八条直线，无视
      type: 'GainsEffect',
      netRegex: { effectId: ['808'] },
      run: async (data, matches) => {
        if (matches.count=='222') {
          data.minId=parseInt(matches.targetId, 16)-16;
        }
        let result0 = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.targetId, 16)],
        });
        let result=result0.combatants[0];
        if (matches.count=='21E') {
          let a=headingTo8Dir(result.Heading);
          data.inner1=a;
        }
        if (matches.count=='21F') {
          // console.log(`内直角`);
          let a=headingTo8Dir(result.Heading);
          data.inner1=a;
          data.inner2=[(a+2)%8];
        }
        if (matches.count=='220') {
          // console.log(`内一`);
          let a=headingTo8Dir(result.Heading);
          data.inner1=a;
          data.inner2=(a+4)%8;
        }
        if (matches.count=='221') {
          
          let a=headingTo8Dir(result.Heading);
          // console.log(`中${a}`);
          data.middleDic[a]=a;
          data.middleDic[(a+7)%8]=(a+7)%8;
          data.middleDic[(a+1)%8]=(a+1)%8;

          data.middleDic[(a+4)%8]=(a+4)%8;
          data.middleDic[(a+3)%8]=(a+2)%8;
          data.middleDic[(a+5)%8]=(a+6)%8;
        }
      },
    },
    //外圈三角方块分布
    {
      //1=方块 2=三角
      id: 'RubicanteEx 转盘外圈三角方块分布',
      regex: /ChatLog 00:0:106:(?<ID>.{8}):[^:]*:.{4}:.{4}:000011D1:/,
      run: async (data, matches) => {
        
        let type=(parseInt(matches.ID, 16)-data.minId)%2+1;
        let pos=(11-Math.floor((parseInt(matches.ID, 16)-data.minId)/2))%8;
        // console.log(`外形状${pos}:${type}`);
        data.outDic[pos]=type;
      },
    },
    //圈旋转
    {
      id: 'RubicanteEx 圈旋转',
      regex: /101:.{8}:......(?<rotation>01|10):0(?<layer>[1-3]):/,
      run: async (data, matches) => {
        //内圈
        if (matches.layer=='1') {
          if (matches.rotation=='10') {
            if (data.inner1 !==undefined && data.inner1 !=-1 ) {
              data.inner1=(data.inner1+7)%8;
            }
            if (data.inner2 !==undefined && data.inner2 !=-1 ) {
              data.inner2=(data.inner2+7)%8;
            }
          }
          if (matches.rotation=='01') {
            // console.log(`内顺`);
            if (data.inner1 !==undefined && data.inner1 !=-1 ) {
              data.inner1=(data.inner1+1)%8;
            }
            if (data.inner2 !==undefined && data.inner2 !=-1 ) {
              data.inner2=(data.inner2+1)%8;
            }
          }
        }

        //中圈
        if (matches.layer=='2') {
          let newMiddle=[-1,-1,-1,-1,-1,-1,-1,-1];
          for (let i = 0; i < 8; i++) {
            if (matches.rotation=='10') {
              let r=data.middleDic[(i+1)%8];
              if (r!=-1) {
                r=(r+7)%8;
              }
              newMiddle[i]=r;
            }
            if (matches.rotation=='01') {
              let r=data.middleDic[(i+7)%8];
              if (r!=-1) {
                r=(r+1)%8;
              }
              newMiddle[i]=r;
            }  
          }
          data.middleDic=newMiddle;
        }

        //外圈
        if (matches.layer=='3') {
          let newOut=[0,0,0,0,0,0,0,0];
          
          for (let i = 0; i < 8; i++) {
            if (matches.rotation=='10') {
              newOut[i]=data.outDic[(i+1)%8];
            }
            if (matches.rotation=='01') {
              newOut[i]=data.outDic[(i+7)%8];
            }  
          }
          data.outDic=newOut;
        }
      },
    },
    {
      id: 'RubicanteEx 转盘绘图重置',
      regex: /101:.{8}:......(?<rotation>01|10):0(?<layer>[1-3]):/,
      delaySeconds: 3,
      suppressSeconds:1,
      run: (data, matches) => {
          
          
          data.inner1=-1;
          data.inner2=-1;
      },
    },

    // //转盘绘图
    {
      id: 'RubicanteEx 转盘绘图',
      regex: /101:.{8}:......(?<rotation>01|10):0(?<layer>[1-3]):/,
      delaySeconds: 0.5,
      suppressSeconds:1,
      run: async (data, matches) => {
        if (data.inner1 !==undefined && data.inner1 != -1) {
          let end = data.middleDic[data.inner1];
          let rot = end * 45;
          let endx = 100 + Math.sin(Math.PI / 4 * end) * 20;
          let endz = 100 - Math.cos(Math.PI / 4 * end) * 20;
          if (data.outDic[end] == 2) {
            postAoe(`{"Name":"转盘三角","AoeType":"Sector","CentreType":"PostionValue","CentreValue":{"X":${endx},"Y":0,"Z":${endz}},"Radius":60,"Angle":60,"Rotation":${rot},"Color":1073807359,"Delay":0,"During":21}`);
          }
          if (data.outDic[end] == 1) {
            postAoe(`{"Name":"转盘方块","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":${endx},"Y":0,"Z":${endz}},"Length":20,"Width":80,"Rotation":${rot},"Color":1073807359,"Delay":0,"During":21}`);
          }
        }
        if (data.inner2 !==undefined && data.inner2 != -1) {
          let end = data.middleDic[data.inner2];
          let rot = end * 45;
          let endx = 100 + Math.sin(Math.PI / 4 * end) * 20;
          let endz = 100 - Math.cos(Math.PI / 4 * end) * 20;
          if (data.outDic[end] == 2) {
            postAoe(`{"Name":"转盘三角","AoeType":"Sector","CentreType":"PostionValue","CentreValue":{"X":${endx},"Y":0,"Z":${endz}},"Radius":60,"Angle":60,"Rotation":${rot},"Color":1073807359,"Delay":0,"During":21}`);
          }
          if (data.outDic[end] == 1) {
            postAoe(`{"Name":"转盘方块","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":${endx},"Y":0,"Z":${endz}},"Length":20,"Width":80,"Rotation":${rot},"Color":1073807359,"Delay":0,"During":21}`);
          }
        }
      },
    },



  ],
  
});
