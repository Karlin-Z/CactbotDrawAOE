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
function setFace(face, delay, during) {
  if (pipeAoe) {
    sendExtraLogCommand(`SetFace`, `{"Face":${face},"Delay":${delay},"During":${during}}`);
  } else {
    fetch(`http://127.0.0.1:${aoeport}/SetFace`, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: `{"Face":${face},"Delay":${delay},"During":${during}}`
    });
  }
}
const sendCommand = (command) => {
  callOverlayHandler({ call: 'PostNamazu', c: 'command', p: `${command}` });
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
const sendExtraLogCommand = (command,info) => {
  callOverlayHandler({ call: 'ExtraLog', c: `${command}`, p: `${info}` });
}
const firstMarker = parseInt('0017', 16);
const getHeadmarkerId = (data, matches) => {
  if (data.decOffset === undefined)
    data.decOffset = parseInt(matches.id, 16) - firstMarker;
  // The leading zeroes are stripped when converting back to string, so we re-add them here.
  // Fortunately, we don't have to worry about whether or not this is robust,
  // since we know all the IDs that will be present in the encounter.
  return (parseInt(matches.id, 16) - data.decOffset).toString(16).toUpperCase().padStart(4, '0');
}
const RotatePointFromCentre = (point, centre, angle) => {
  let rot=(1-(Math.atan2(point.posX-centre.posX,point.posY-centre.posY)/Math.PI))%2*180;
  let dis=Math.sqrt(Math.pow(point.posX - centre.posX, 2) + Math.pow((point.posY - centre.posY), 2));
  var end=new Object();
  end.posX = centre.posX+Math.sin((rot + angle) / 180 * Math.PI) * dis;
  end.posY = centre.posY-Math.cos((rot + angle) / 180 * Math.PI) * dis; 
  return end;
}

let jobToRole = {
  PLD: 'tank',
  MNK: 'dps',
  WAR: 'tank',
  DRG: 'dps',
  BRD: 'dps',
  WHM: 'healer',
  BLM: 'dps',
  SMN: 'dps',
  SCH: 'healer',
  NIN: 'dps',
  MCH: 'dps',
  DRK: 'tank',
  AST: 'healer',
  SAM: 'dps',
  RDM: 'dps',
  GNB: 'tank',
  DNC: 'dps',
  RPR: 'dps',
  SGE: 'healer',
  BLU: 'dps',
};
Options.Triggers.push({
  id: 'TheOmegaProtocolUltimate_draw',
  zoneId: ZoneId.TheOmegaProtocolUltimate,
  config: [
    {
      id: "AoeSendMode",
      name: { en: "Aoe发送方式" },
      type: "select",
      options: { en: { "网络": "Http", "管道": "Pipe" } },
      default: "Http",
    },
    {
      id: "P3_Sort",
      name: { en: "P3地震优先级" },
      type: "select",
      options: { en: { "HTDH": "HTDH", "TDH": "TDH" } },
      default: "HTDH",
    },
    {
      id: "P3_Face",
      name: { en: "P3小电视自动面向" },
      type: "checkbox",
      default: false,
    },
    {
      id: "P5_Face",
      name: { en: "P5小电视自动面向" },
      type: "checkbox",
      default: false,
    },
    {
      id: "P5_2Tower",
      name: { en: "P5二运踩塔方式" },
      type: "select",
      options: { en: { "莫灵喵原版": "MLM", "斜米无脑式": "Fool" } },
      default: "MLM",
    },
    {
      id: "P5_1Marker",
      name: { en: "P5一运标点" },
      type: "checkbox",
      default: false,
    },
    {
      id: "P5_2Marker",
      name: { en: "P5二运标点" },
      type: "checkbox",
      default: false,
    },
    {
      id: "P5_3Marker",
      name: { en: "P5三运标点" },
      type: "checkbox",
      default: false,
    },
    {
      id: "DebugMode",
      name: { en: "以下列职业角色触发触发器" },
      type: "checkbox",
      default: false,
    },
    {
      id: "TriggerJob",
      name: { en: "触发主视角职业" },
      type: "select",
      options: { en: {
        '骑士':`PLD`,
        '武僧':`MNK`,
        '战士':`WAR`,
        '龙骑':`DRG`,
        '诗人':`BRD`,
        '白魔':`WHM`,
        '黑魔':`BLM`,
        '召唤':`SMN`,
        '学者':`SCH`,
        '忍者':`NIN`,
        '机工':`MCH`,
        '黑骑':`DRK`,
        '占星':`AST`,
        '武士':`SAM`,
        '赤魔':`RDM`,
        '枪刃':`GNB`,
        '舞者':`DNC`,
        '镰刀':`RPR`,
        '贤者':`SGE`,
        '青魔':`BLU`
      } },
      default: "PLD",
    },
  ],
  initData: () => {
    return {
      phase: 'p1',
      阶段:'开场',
      点名列表: [],
      自己点名:0,
      tower:[],
      towerPos:[],
      myId:0,
      p1BossId:0,
      故障Buff:'',
    };
  },
  triggers: [
    { id: 'TOP 测试用触发器',
      type: 'Ability',
      netRegex: { id: '7BFD', capture: true },
      suppressSeconds: 20,
      run: async (data, matches) => {
        let jobid={
        "PLD":19,
        "MNK":20,
        "WAR":21,
        "DRG":22,
        "BRD":23,
        "WHM":24,
        "BLM":25,
        "SMN":27,
        "SCH":28,
        "NIN":30,
        "MCH":31,
        "DRK":32,
        "AST":33,
        "SAM":34,
        "RDM":35,
        "BLU":36,
        "GNB":37,
        "DNC":38,
        "RPR":39,
        "SGE":40,}
        if(data.triggerSetConfig.DebugMode)
        {
          data.role=jobToRole[data.triggerSetConfig.TriggerJob];
          data.job=data.triggerSetConfig.TriggerJob;
          let jid= jobid[data.triggerSetConfig.TriggerJob];
          let combatantData = (await callOverlayHandler({
            call: 'getCombatants',
          })).combatants;
          data.me=combatantData.find((v) => v.Job === jid)?.Name;
        }
      },
    },
    { id: 'TOP 获取小队列表',
      type: 'Ability',
      netRegex: { id: '7BFD', capture: true },
      suppressSeconds: 20,
      run: async (data, matches) => {
        if(data.triggerSetConfig.AoeSendMode === 'Http')
          pipeAoe=false;
        if(data.triggerSetConfig.AoeSendMode === 'Pipe')
          pipeAoe=true;
        requestPartyList();
      },
    },
    { id: 'TOP 处理小队列表',
      regex: /Debug FB:PartyList:(?<Str>[^:]*):End/,
      run: async (data, matches) => {
        let partylist = JSON.parse(matches.Str);
        data.HTDHParty=[];
        data.HTDHParty.push(partylist[2]);
        data.HTDHParty.push(partylist[0]);
        data.HTDHParty.push(partylist[1]);
        data.HTDHParty.push(partylist[4]);
        data.HTDHParty.push(partylist[5]);
        data.HTDHParty.push(partylist[6]);
        data.HTDHParty.push(partylist[7]);
        data.HTDHParty.push(partylist[3]);



        data.TDHParty=[];
        data.TDHParty.push(partylist[0]);
        data.TDHParty.push(partylist[1]);
        data.TDHParty.push(partylist[2]);
        data.TDHParty.push(partylist[3]);
        data.TDHParty.push(partylist[4]);
        data.TDHParty.push(partylist[5]);
        data.TDHParty.push(partylist[6]);
        data.TDHParty.push(partylist[7]);
        
      },
    },
    { id: 'TOP 分P',
      type: 'StartsUsing',
      // 7B40 = Firewall
      // 8014 = Run ****mi* (Sigma Version)
      // 8015 = Run ****mi* (Omega Version)
      netRegex: { id: ['7B40', '8014', '8015','7B03','7B0B','7B3E','7B38','7B88'], capture: true },
      run: (data, matches) => {
        switch (matches.id) {
          case '7B03':
            data.阶段 = '循环程序';
            break;
          case '7B0B':
            data.阶段 = '全能之主';
            break;
          case '7B3E':
            data.阶段 = 'P2协作程序PT';
            break;
          case '7B38':
            data.阶段 = 'P2协作程序LB';
            break;
          case '7B88':
            data.阶段 = 'delta';
            break;
          case '8014':
            data.阶段 = 'sigma';
            break;
          case '8015':
            data.阶段 = 'omega';
            break;
        }
        
      },
    },
    { id: 'TOP 分P_2',
      type: 'Ability',
      netRegex: { id: ['7BFD', '7B13', '7B47', '7B7C', '7F72'], capture: true },
      suppressSeconds: 20,
      run: (data, matches) => {
        switch (matches.id) {
          case '7B13':
            data.阶段 = 'P3开场';
            break;
          case '7B47':
            data.阶段 = 'p4';
            break;
          case '7B7C':
            data.阶段 = 'delta';
            break;
          case '7F72':
            data.阶段 = 'p6';
            break;
        }
      },
    },
    { id: 'TOP 清除排队buff',
      type: 'StartsUsing',
      // 7B03 = Program Loop
      // 7B0B = Pantokrator
      netRegex: { id: ['7B03', '7B0B','7B3E']},
      // Don't clean up when the buff is lost, as that happens after taking a tower.
      run: (data, matches) => {
         data.点名列表 = {};
         data.自己点名=0;
         data.p1BossId=parseInt(matches.sourceId, 16);
         },
    },
    { id: 'TOP 头顶点名解析',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data) => data.decOffset === undefined,
      // Unconditionally set the first headmarker here so that future triggers are conditional.
      run: (data, matches) => getHeadmarkerId(data, matches),
    },
    { id: 'TOP P1排队buff',
      type: 'GainsEffect',
      netRegex: { effectId: ['BBC', 'BBD', 'BBE', 'D7B'] },
      run: (data, matches) => {
        const effectToNum = {
          BBC: 1,
          BBD: 2,
          BBE: 3,
          D7B: 4,
        };
        const num = effectToNum[matches.effectId];
        if (num === undefined)
          return;
        if(data.点名列表[num]=== undefined) data.点名列表[num]=[];
        data.点名列表[num].push(parseInt(matches.targetId, 16));
        if (matches.target== data.me) {
          data.自己点名=num;
          data.myId=parseInt(matches.targetId, 16);
        }
        
      },
    },
    { id: 'TOP P1循环程序提醒',
      type: 'GainsEffect',
      netRegex: { effectId: ['BBC', 'BBD', 'BBE', 'D7B'] },
      condition: Conditions.targetIsYou(),
      infoText: (data, matches) => {
        if (data.阶段!='循环程序') return;
        const effectToNum = {
          BBC: 1,
          BBD: 2,
          BBE: 3,
          D7B: 4,
        };
        const num = effectToNum[matches.effectId];
        if (num === undefined)
          return;
        if (num==3) {
          return `靠前接线`;
        }else
        {
          return `靠后`;
        }
        
      },
    },
    { id: 'TOP P1循环程序集合提醒',
      type: 'StartsUsing',
      netRegex: { id: '7B03'},
      // Don't clean up when the buff is lost, as that happens after taking a tower.
      infoText: (data, matches) => {
         return `Boss背后集合`
         },
    },
    { id: 'TOP P1循环程序塔位置收集',
      type: 'Object',
      netRegex:
        /] ChatLog 00:0:101:.{8}:0005:(?<id>.{4}):1EB83D:E0000000:(?<x>.+?):(?<y>.+?):/,
      run: (data, matches) => {
        let x = parseFloat(matches.x);
        let y = parseFloat(matches.y);
        let pos = Math.round(
          Math.round(2 - (2 * Math.atan2(x - 100, y - 100)) / Math.PI) % 4
        );
        data.tower.push(pos);
        data.towerPos.push([x,y]);
      },
    },
    { id: 'TOP P1循环程序踩塔接线位置 作图',
      type: 'Object',
      netRegex:
        /] ChatLog 00:0:101:.{8}:0005:(?<id>.{4}):1EB83D:E0000000:(?<x>.+?):(?<y>.+?):/,
      delaySeconds:0.5,
      suppressSeconds:2,
      run: async (data, matches) => {
        let dur=9;

        


        //解析线塔位置及排序
        let tw=[1,1,1,1];
        let t1p=data.tower.length-1;
        let t2p=data.tower.length-2;
        tw[data.tower[t1p]]=0;
        tw[data.tower[t2p]]=0;
        let ht=tw.indexOf(0);
        let lt=tw.lastIndexOf(0);
        let hl=tw.indexOf(1);
        let ll=tw.lastIndexOf(1);
        let htPos=[100,100];
        let ltPos=[100,100];
        if (data.tower[t1p]<data.tower[t2p]) {
          htPos=data.towerPos[t1p];
          ltPos=data.towerPos[t2p];
        }else {
          htPos=data.towerPos[t2p];
          ltPos=data.towerPos[t1p];
        }

        //线塔坐标
        let htx=100+Math.sin(ht/2*Math.PI)*12.4;
        let hty=100-Math.cos(ht/2*Math.PI)*12.4;
        let ltx=100+Math.sin(lt/2*Math.PI)*12.4;
        let lty=100-Math.cos(lt/2*Math.PI)*12.4;
        let hlx=100+Math.sin(hl/2*Math.PI)*15;
        let hly=100-Math.cos(hl/2*Math.PI)*15;
        let llx=100+Math.sin(ll/2*Math.PI)*15;
        let lly=100-Math.cos(ll/2*Math.PI)*15;

        //人物排序
        let num=Math.floor(data.tower.length/2);
        let lineNum=(num+1)%4+1;
        let t1 = data.点名列表[num][0];
        let t2 = data.点名列表[num][1];
        let l1 = data.点名列表[lineNum][0];
        let l2 = data.点名列表[lineNum][1];

        if (data.HTDHParty.indexOf(t1) < data.HTDHParty.indexOf(t2)) {
          if (t1 == data.myId)
          {
            postAoe(`{"Name":"循环程序 塔${num}高顺位","AoeType":"Link","CentreType":"ActorId","CentreValue":${t1},"Centre2Type":"PostionValue","Centre2Value":{"X":${htPos[0]},"Y":0,"Z":${htPos[1]}},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"循环程序 塔${num}高顺位位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${htPos[0]},"Y":0,"Z":${htPos[1]}},"Radius":3.0,"Color":1073807104,"Delay":0,"During":${dur}}`);
          }
          if (t2 == data.myId)
          {
            postAoe(`{"Name":"循环程序 塔${num}低顺位","AoeType":"Link","CentreType":"ActorId","CentreValue":${t2},"Centre2Type":"PostionValue","Centre2Value":{"X":${ltPos[0]},"Y":0,"Z":${ltPos[1]}},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"循环程序 塔${num}低顺位位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${ltPos[0]},"Y":0,"Z":${ltPos[1]}},"Radius":3.0,"Color":1073807104,"Delay":0,"During":${dur}}`);
          }
        } else {
          if (t2 == data.myId)
          {
            postAoe(`{"Name":"循环程序 塔${num}高顺位","AoeType":"Link","CentreType":"ActorId","CentreValue":${t2},"Centre2Type":"PostionValue","Centre2Value":{"X":${htPos[0]},"Y":0,"Z":${htPos[1]}},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"循环程序 塔${num}高顺位位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${htPos[0]},"Y":0,"Z":${htPos[1]}},"Radius":3.0,"Color":1073807104,"Delay":0,"During":${dur}}`);
          }
          if (t1 == data.myId)
          {
            postAoe(`{"Name":"循环程序 塔${num}低顺位","AoeType":"Link","CentreType":"ActorId","CentreValue":${t1},"Centre2Type":"PostionValue","Centre2Value":{"X":${ltPos[0]},"Y":0,"Z":${ltPos[1]}},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"循环程序 塔${num}低顺位位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${ltPos[0]},"Y":0,"Z":${ltPos[1]}},"Radius":3.0,"Color":1073807104,"Delay":0,"During":${dur}}`);
          }
        }
        if (data.HTDHParty.indexOf(l1) < data.HTDHParty.indexOf(l2)) {
          if (l1 == data.myId)
          {
            postAoe(`{"Name":"循环程序 线${num}高顺位","AoeType":"Link","CentreType":"ActorId","CentreValue":${l1},"Centre2Type":"PostionValue","Centre2Value":{"X":${hlx},"Y":0,"Z":${hly}},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"循环程序 线${num}高顺位位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${hlx},"Y":0,"Z":${hly}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);

          }
          if (l2 == data.myId)
          {
            postAoe(`{"Name":"循环程序 线${num}低顺位","AoeType":"Link","CentreType":"ActorId","CentreValue":${l2},"Centre2Type":"PostionValue","Centre2Value":{"X":${llx},"Y":0,"Z":${lly}},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"循环程序 线${num}低顺位位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${llx},"Y":0,"Z":${lly}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          }
        } else {
          if (l2 == data.myId)
          {
            postAoe(`{"Name":"循环程序 线${num}高顺位","AoeType":"Link","CentreType":"ActorId","CentreValue":${l2},"Centre2Type":"PostionValue","Centre2Value":{"X":${hlx},"Y":0,"Z":${hly}},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"循环程序 线${num}高顺位位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${hlx},"Y":0,"Z":${hly}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          }
          if (l1 == data.myId)
          {
            postAoe(`{"Name":"循环程序 线${num}低顺位","AoeType":"Link","CentreType":"ActorId","CentreValue":${l1},"Centre2Type":"PostionValue","Centre2Value":{"X":${llx},"Y":0,"Z":${lly}},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"循环程序 线${num}低顺位位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${llx},"Y":0,"Z":${lly}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          }
        }

        if (t1 != data.myId && t2 != data.myId && l1 != data.myId && l2 != data.myId) {
          let result = await callOverlayHandler({
            call: 'getCombatants',
            ids: [data.myId],
          });
          let posX = result.combatants[0].PosX;
          let posY = result.combatants[0].PosY;

          let dis1=Math.pow(posX - htx, 2) + Math.pow((posY - hty), 2);
          let dis2=Math.pow(posX - ltx, 2) + Math.pow((posY - lty), 2);
          if (dis1<dis2) {
            postAoe(`{"Name":"循环程序 轮空站位","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${htx},"Y":0,"Z":${hty}},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
          
          }else
          {
            postAoe(`{"Name":"循环程序 轮空站位","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${ltx},"Y":0,"Z":${lty}},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
          
          }

        }
      },
    },
    { id: 'TOP P1循环程序接线标记',
      type: 'Ability',
      netRegex: { id: '7B08'},
      run: (data, matches) => {
        
        if (data.p1LineCount === undefined) data.p1LineCount = 0;
        data.p1LineCount++;
        let waitNum=(data.p1LineCount+1)%4+1
        let num=(data.p1LineCount+2)%4+1;
        if (num != data.自己点名)
          return;
        
        
        let w1 = data.点名列表[waitNum][0];
        let w2 = data.点名列表[waitNum][1];
        let g1 = data.点名列表[num][0];
        let g2 = data.点名列表[num][1];
        if (data.HTDHParty.indexOf(w1)<data.HTDHParty.indexOf(w2)) {
          var a=w1;
          w1=w2;
          w2=a;
        }
        if (data.HTDHParty.indexOf(g1)<data.HTDHParty.indexOf(g2)) {
          var a=g1;
          g1=g2;
          g2=a;
        }
        if (data.myId==g1) {
          postAoe(`{"Name":"P1循环程序接线标记","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.p1BossId},"Centre2Type":"ActorId","Centre2Value":${w1},"Thikness":15,"Color":4278255615,"Delay":0,"During":9}`)
        }
        if (data.myId==g2) {
          postAoe(`{"Name":"P1循环程序接线标记","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.p1BossId},"Centre2Type":"ActorId","Centre2Value":${w2},"Thikness":15,"Color":4278255615,"Delay":0,"During":9}`)
        }
      },
    },
    { id: 'TOP P1循环程序接线标记移除',
      type: 'Tether',
      netRegex: { id: '0059'},
      condition: (data) => data.阶段 === '循环程序',
      run: async (data, matches) => {
        if (matches.source==data.me) {
          removeAoe(`P1循环程序接线标记`);
        }
        
      },
    },
    { id: 'TOP P1全能之主报高低顺位',
      type: 'Ability',
      netRegex: { id: '7B0B'},
      delaySeconds:0.7,
      alertText: (data, _matches, output) => {
        const myNum = data.自己点名;
        if (myNum === undefined || myNum==0)
          return;
        let t = data.点名列表[myNum][0];
        if (t==data.myId) {
          t=data.点名列表[myNum][1];
        }
        if(data.HTDHParty.indexOf(t)<data.HTDHParty.indexOf(data.myId))
        {
          return output.low();
        }else
        {
          return output.high();
        }
      },
      outputStrings: {
        high: {
          cn: '高顺位(上右)',
        },
        low:{
          cn: '低顺位(下左)',
        },
      },
    },
    { id: 'TOP P1全能之主分摊范围',
      type: 'GainsEffect',
      netRegex: { effectId: ['DB3','DB4','DB5','DB6'] },
      condition: (data) => data.阶段 === '全能之主',
      run: async (data, matches) => {
        let delay=parseFloat(matches.duration)-3;
        postAoe(`{"Name":"全能之主分摊范围","AoeType":"Rect","CentreType":"ActorId","CentreValue":${data.p1BossId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Length":30,"Width":6.0,"Rotation":0.0,"Color":1073807104,"Delay":${delay},"During":3}`);
      },
    },
    { id: 'TOP P1运全能之主单点命中',
      type: 'Ability',
      netRegex: { id: '7B0E'},
      condition: Conditions.targetIsYou(),
      alertText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          cn: '回头',
        },
      },
    },
    { id: 'TOP P1最远距离顺劈',
      type: 'HeadMarker',
      netRegex: {},
      suppressSeconds: 20,
      run: (data, matches) => {
        const id = getHeadmarkerId(data, matches);
        if (id === '0017')
        {
          postAoe(`{"Name":"P1最远距离顺劈","AoeType":"Sector","CentreType":"ActorId","CentreValue":${data.p1BossId},"TrackType":"Farest","TrackValue":2,"Radius":20,"Angle":120,"Rotation":0.0,"Color":503382015,"Delay":0,"During":13}`);
        }
      },
    },
    { id: 'TOP P1点名直线',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data) => data.阶段 === '全能之主',
      run: (data, matches) => {
        const id = getHeadmarkerId(data, matches);
        if (id === '0017')
        {
          postAoe(`{"Name":"P1点名直线","AoeType":"Rect","CentreType":"ActorId","CentreValue":${data.p1BossId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Length":50.0,"Width":6.0,"Rotation":0.0,"Color":1291911167,"Delay":0,"During":5}`);
        }
      },
      
    },
    { id: 'TOP P1顺劈引导位置',
      type: 'StartsUsing',
      netRegex: { id: '7E70', capture: true },
      suppressSeconds:0.5,
      run: (data, matches) => {
        if (data.p1fire===undefined) data.p1fire=0;
        data.p1fire++;
        if (data.p1fire==13) {
          let a= data.HTDHParty.indexOf(data.myId);
          if (a==1||a==2) {
            postAoe(`{"Name":"P1顺劈引导位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":88.0},"Radius":0.5,"Color":1073807104,"Delay":0,"During":11}`);
            postAoe(`{"Name":"P1顺劈引导位置连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":100,"Y":0,"Z":88.0},"Thikness":5,"Color":4278255360,"Delay":0,"During":11}`);
          }
        }
        
      },
    },
    { id: 'TOP P2一运协同程序',
      type: 'Ability',
      netRegex: { id: '7B3E'},
      // Untargetable 3s after this, things appear ~2 after this, 2.5 for safety.
      delaySeconds: 5.5,
      run: async (data, _matches) => {
        let dur=5.5;
        let col=1073774847;




        // TODO: filter this by the combatants added right before Party Synergy???
        let combatantData = (await callOverlayHandler({
          call: 'getCombatants',
        })).combatants;
        const omegaMNPCId = 15714;
        const omegaFNPCId = 15715;
        for (const c of combatantData) {
          if (c.BNpcID === omegaMNPCId) {
            let dis=Math.pow(c.PosX - 100, 2) + Math.pow((c.PosY - 100), 2);
            if (dis<144) {
              if (c.WeaponId === 4)
              {
                //男人月环
                postAoe(`{"Name":"P2一运男人月环","AoeType":"Donut","CentreType":"ActorId","CentreValue":${c.ID},"Radius":40,"InnerRadius":10,"Color":${col},"Delay":0,"During":${dur}}`);
              }else{
                //男人钢铁
                postAoe(`{"Name":"P2一运男人钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":${c.ID},"Radius":10,"Color":${col},"Delay":0,"During":${dur}}`);
                
              }
            }
          }
          if (c.BNpcID === omegaFNPCId) {
            if (c.WeaponId === 4)
            {
              let posx1= c.PosX+Math.sin(c.Heading+Math.PI/2)*13+Math.sin(c.Heading+Math.PI)*10;
              let posy1= c.PosY+Math.cos(c.Heading+Math.PI/2)*13+Math.cos(c.Heading+Math.PI)*10;
              let posx2= c.PosX+Math.sin(c.Heading-Math.PI/2)*13+Math.sin(c.Heading+Math.PI)*10;
              let posy2= c.PosY+Math.cos(c.Heading-Math.PI/2)*13+Math.cos(c.Heading+Math.PI)*10;
              let rot= (-c.Heading/Math.PI)*180;
              postAoe(`{"Name":"P2一运女人辣翅右","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":${posx1},"Y":0,"Z":${posy1}},"Length":40,"Width":18,"Rotation":${rot},"Color":${col},"Delay":0,"During":${dur}}`);
              postAoe(`{"Name":"P2一运女人辣翅左","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":${posx2},"Y":0,"Z":${posy2}},"Length":40,"Width":18,"Rotation":${rot},"Color":${col},"Delay":0,"During":${dur}}`);
              //女人辣翅
              // postAoe(`{"Name":"P2一运女人辣翅","AoeType":"Rect","CentreType":"ActorId","CentreValue":${c.ID},"Length":40,"Width":10.0,"Rotation":0.0,"Color":1073807104,"Delay":0,"During":${dur}}`);
            }else{
              //女人十字
              postAoe(`{"Name":"P2一运女人十字1","AoeType":"Rect","CentreType":"ActorId","CentreValue":${c.ID},"Length":40,"Width":10.0,"Rotation":0.0,"Color":${col},"Delay":0,"During":${dur}}`);
              postAoe(`{"Name":"P2一运女人十字2","AoeType":"Rect","CentreType":"ActorId","CentreValue":${c.ID},"Length":40,"Width":10.0,"Rotation":90.0,"Color":${col},"Delay":0,"During":${dur}}`);
              postAoe(`{"Name":"P2一运女人十字3","AoeType":"Rect","CentreType":"ActorId","CentreValue":${c.ID},"Length":40,"Width":10.0,"Rotation":180.0,"Color":${col},"Delay":0,"During":${dur}}`);
              postAoe(`{"Name":"P2一运女人十字4","AoeType":"Rect","CentreType":"ActorId","CentreValue":${c.ID},"Length":40,"Width":10.0,"Rotation":270.0,"Color":${col},"Delay":0,"During":${dur}}`);

            }
          }
        }
      },
      
    },
    { id: 'TOP P2中远程故障buff',
      type: 'GainsEffect',
      // D63 = Mid Glitch
      // D64 = Remote Glitch
      netRegex: { effectId: ['D63', 'D64'] },
      suppressSeconds: 10,
      run: (data, matches) => data.故障Buff = matches.effectId === 'D63' ? 'mid' : 'remote',
    },
    { id: 'TOP P2索尼收集器',
      type: 'HeadMarker',
      netRegex: {},
      run: (data, matches) => {
        const id = getHeadmarkerId(data, matches);
        const headmarkers = {
          // vfx/lockon/eff/z3oz_firechain_01c.avfx through 04c
          '01A0':1,
          '01A1':3,
          '01A2':4,
          '01A3':2,
        };
        const num = headmarkers[id];
        if (num === undefined)
          return;
        if (data.点名列表[num] === undefined) data.点名列表[num] = [];
        data.点名列表[num].push(parseInt(matches.targetId, 16));
        if (matches.target == data.me) {
          data.自己点名 = num;
          data.myId = parseInt(matches.targetId, 16);
        }
        
      },
    },
    { id: 'TOP P2眼睛激光',
      type: 'Object',
      netRegex:
        /] ChatLog 00:0:103:.{8}:.{8}:00020001:0000000(?<x>[1-8]):/,
      delaySeconds: 7.5,
      condition: (data) => data.阶段 === 'P2协作程序PT',
      suppressSeconds: 99,
      run: (data, matches) => {
        const dir = {
          '1': 0,
          '2': 1,
          '3': 2,
          '4': 3,
          '5': 4,
          '6': 5,
          '7': 6,
          '8': 7,
        }[matches.x];
        let x = 100 + Math.sin(dir / 4 * Math.PI) * 20;
        let y = 100 - Math.cos(dir / 4 * Math.PI) * 20;
        let rot=(1-(Math.atan2(x-100,y-100)/Math.PI))%2*180;
        postAoe(`{"Name":"P2一运眼睛激光","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":${x},"Y":0,"Z":${y}},"Length":40,"Width":16,"Rotation":${rot},"Color":1073807359,"Delay":0,"During":6}`);
      },
    },
    { id: 'TOP P2眼睛索尼站位',
      type: 'Object',
      netRegex:
        /] ChatLog 00:0:103:.{8}:.{8}:00020001:0000000(?<x>[1-8]):/,
        
      delaySeconds: 3,
      suppressSeconds: 10,
      condition: (data) => data.阶段 === 'P2协作程序PT',
      run: (data, matches) => {
        let dur=11;

        
        const dir = {
          '1': 0,
          '2': 1,
          '3': 2,
          '4': 3,
          '5': 4,
          '6': 5,
          '7': 6,
          '8': 7,
        }[matches.x];
        let x = 100 + Math.sin(dir / 4 * Math.PI) * 20;
        let y = 100 - Math.cos(dir / 4 * Math.PI) * 20;
        let rot=(1-(Math.atan2(x-100,y-100)/Math.PI))%2*180;
        //中线22+-0.5
        let mr1dx = Math.sin((rot + 34.51) / 180 * Math.PI) * 19.416;
        let mr1dy = Math.cos((rot + 34.51) / 180 * Math.PI) * 19.416; 
        let mr2dx = Math.sin((rot + 65.56) / 180 * Math.PI) * 12.083;
        let mr2dy = Math.cos((rot + 65.56) / 180 * Math.PI) * 12.083; 
        let mr3dx = Math.sin((rot + 114.44) / 180 * Math.PI) * 12.083;
        let mr3dy = Math.cos((rot + 114.44) / 180 * Math.PI) * 12.083; 
        let mr4dx = Math.sin((rot + 145.49) / 180 * Math.PI) * 19.416;
        let mr4dy = Math.cos((rot + 145.49) / 180 * Math.PI) * 19.416;
        let ml1dx = Math.sin((rot - 34.51) / 180 * Math.PI) * 19.416;
        let ml1dy = Math.cos((rot - 34.51) / 180 * Math.PI) * 19.416; 
        let ml2dx = Math.sin((rot - 65.56) / 180 * Math.PI) * 12.083;
        let ml2dy = Math.cos((rot - 65.56) / 180 * Math.PI) * 12.083; 
        let ml3dx = Math.sin((rot - 114.44) / 180 * Math.PI) * 12.083;
        let ml3dy = Math.cos((rot - 114.44) / 180 * Math.PI) * 12.083; 
        let ml4dx = Math.sin((rot - 145.49) / 180 * Math.PI) * 19.416;
        let ml4dy = Math.cos((rot - 145.49) / 180 * Math.PI) * 19.416;

        //远线
        let fr4dx = Math.sin((rot + 34.51) / 180 * Math.PI) * 19.416;
        let fr4dy = Math.cos((rot + 34.51) / 180 * Math.PI) * 19.416; 
        let fr3dx = Math.sin((rot + 74.88) / 180 * Math.PI) * 19.164;
        let fr3dy = Math.cos((rot + 74.88) / 180 * Math.PI) * 19.164; 
        let fr2dx = Math.sin((rot + 105.12) / 180 * Math.PI) * 19.164;
        let fr2dy = Math.cos((rot + 105.12) / 180 * Math.PI) * 19.164; 
        let fr1dx = Math.sin((rot + 145.49) / 180 * Math.PI) * 19.416;
        let fr1dy = Math.cos((rot + 145.49) / 180 * Math.PI) * 19.416;
        let fl1dx = Math.sin((rot - 34.51) / 180 * Math.PI) * 19.416;
        let fl1dy = Math.cos((rot - 34.51) / 180 * Math.PI) * 19.416; 
        let fl2dx = Math.sin((rot - 74.88) / 180 * Math.PI) * 19.164;
        let fl2dy = Math.cos((rot - 74.88) / 180 * Math.PI) * 19.164; 
        let fl3dx = Math.sin((rot - 105.12) / 180 * Math.PI) * 19.164;
        let fl3dy = Math.cos((rot - 105.12) / 180 * Math.PI) * 19.164; 
        let fl4dx = Math.sin((rot - 145.49) / 180 * Math.PI) * 19.416;
        let fl4dy = Math.cos((rot - 145.49) / 180 * Math.PI) * 19.416;

        
        // data.自己点名=3;
        // data.myId=272026591;
        let myNum=data.自己点名;
        let other= data.点名列表[myNum][0];
        if (other==data.myId) {
          other=data.点名列表[myNum][1];
        }


        if (data.HTDHParty.indexOf(data.myId)<data.HTDHParty.indexOf(other)) {
          //高顺位
          if (data.故障Buff=='mid') {
            //中
            if (myNum==1) {
              var ex=100+ml1dx;
              var ey=100-ml1dy; 
              postAoe(`{"Name":"P2圆圈高顺位中线站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${ex},"Y":0,"Z":${ey}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
              postAoe(`{"Name":"P2圆圈高顺位中线站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${ex},"Y":0,"Z":${ey}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
              data.moveBuffer=`{"X":${ex},"Y":0,"Z":${ey}}`;
            
            }
            if (myNum==2) {
              var ex=100+ml2dx;
              var ey=100-ml2dy;
              postAoe(`{"Name":"P2叉叉高顺位中线站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${ex},"Y":0,"Z":${ey}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
              postAoe(`{"Name":"P2叉叉高顺位中线站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${ex},"Y":0,"Z":${ey}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
              data.moveBuffer=`{"X":${ex},"Y":0,"Z":${ey}}`;
            }
            if (myNum==3) {
              var ex=100+ml3dx;
              var ey=100-ml3dy;
              postAoe(`{"Name":"P2三角高顺位中线站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${ex},"Y":0,"Z":${ey}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
              postAoe(`{"Name":"P2三角高顺位中线站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${ex},"Y":0,"Z":${ey}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
              data.moveBuffer=`{"X":${ex},"Y":0,"Z":${ey}}`;
            }
            if (myNum==4) {
              var ex=100+ml4dx;
              var ey=100-ml4dy;
              postAoe(`{"Name":"P2方块高顺位中线站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${ex},"Y":0,"Z":${ey}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
              postAoe(`{"Name":"P2方块高顺位中线站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${ex},"Y":0,"Z":${ey}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
              data.moveBuffer=`{"X":${ex},"Y":0,"Z":${ey}}`;
            }

          }
          if (data.故障Buff=='remote') {
            //远
            if (myNum==1) {
              var ex=100+fl1dx;
              var ey=100-fl1dy;
              postAoe(`{"Name":"P2圆圈高顺位远线站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${ex},"Y":0,"Z":${ey}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
              postAoe(`{"Name":"P2圆圈高顺位远线站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${ex},"Y":0,"Z":${ey}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
              data.moveBuffer=`{"X":${ex},"Y":0,"Z":${ey}}`;
            }
            if (myNum==2) {
              var ex=100+fl2dx;
              var ey=100-fl2dy;
              postAoe(`{"Name":"P2叉叉高顺位远线站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${ex},"Y":0,"Z":${ey}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
              postAoe(`{"Name":"P2叉叉高顺位远线站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${ex},"Y":0,"Z":${ey}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
              data.moveBuffer=`{"X":${ex},"Y":0,"Z":${ey}}`;
            }
            if (myNum==3) {
              var ex=100+fl3dx;
              var ey=100-fl3dy;
              postAoe(`{"Name":"P2三角高顺位远线站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${ex},"Y":0,"Z":${ey}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
              postAoe(`{"Name":"P2三角高顺位远线站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${ex},"Y":0,"Z":${ey}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
              data.moveBuffer=`{"X":${ex},"Y":0,"Z":${ey}}`;
            }
            if (myNum==4) {
              var ex=100+fl4dx;
              var ey=100-fl4dy;
              postAoe(`{"Name":"P2方块高顺位远线站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${ex},"Y":0,"Z":${ey}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
              postAoe(`{"Name":"P2方块高顺位远线站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${ex},"Y":0,"Z":${ey}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
              data.moveBuffer=`{"X":${ex},"Y":0,"Z":${ey}}`;
            }
          }
        }else{
          //低顺位
          if (data.故障Buff=='mid') {
            //中
            if (myNum==1) {
              var ex=100+mr1dx;
              var ey=100-mr1dy;
              postAoe(`{"Name":"P2圆圈低顺位中线站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${ex},"Y":0,"Z":${ey}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
              postAoe(`{"Name":"P2圆圈低顺位中线站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${ex},"Y":0,"Z":${ey}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
              data.moveBuffer=`{"X":${ex},"Y":0,"Z":${ey}}`;
            }
            if (myNum==2) {
              var ex=100+mr2dx;
              var ey=100-mr2dy;
              postAoe(`{"Name":"P2叉叉低顺位中线站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${ex},"Y":0,"Z":${ey}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
              postAoe(`{"Name":"P2叉叉低顺位中线站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${ex},"Y":0,"Z":${ey}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
              data.moveBuffer=`{"X":${ex},"Y":0,"Z":${ey}}`;
            }
            if (myNum==3) {
              var ex=100+mr3dx;
              var ey=100-mr3dy;
              postAoe(`{"Name":"P2三角低顺位中线站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${ex},"Y":0,"Z":${ey}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
              postAoe(`{"Name":"P2三角低顺位中线站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${ex},"Y":0,"Z":${ey}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
              data.moveBuffer=`{"X":${ex},"Y":0,"Z":${ey}}`;
            }
            if (myNum==4) {
              var ex=100+mr4dx;
              var ey=100-mr4dy;
              postAoe(`{"Name":"P2方块低顺位中线站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${ex},"Y":0,"Z":${ey}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
              postAoe(`{"Name":"P2方块低顺位中线站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${ex},"Y":0,"Z":${ey}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
              data.moveBuffer=`{"X":${ex},"Y":0,"Z":${ey}}`;
            }

          }
          if (data.故障Buff=='remote') {
            //远
            if (myNum==1) {
              var ex=100+fr1dx;
              var ey=100-fr1dy;
              postAoe(`{"Name":"P2圆圈低顺位远线站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${ex},"Y":0,"Z":${ey}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
              postAoe(`{"Name":"P2圆圈低顺位远线站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${ex},"Y":0,"Z":${ey}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
              data.moveBuffer=`{"X":${ex},"Y":0,"Z":${ey}}`;
            }
            if (myNum==2) {
              var ex=100+fr2dx;
              var ey=100-fr2dy;
              postAoe(`{"Name":"P2叉叉低顺位远线站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${ex},"Y":0,"Z":${ey}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
              postAoe(`{"Name":"P2叉叉低顺位远线站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${ex},"Y":0,"Z":${ey}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
              data.moveBuffer=`{"X":${ex},"Y":0,"Z":${ey}}`;
            }
            if (myNum==3) {
              var ex=100+fr3dx;
              var ey=100-fr3dy;
              postAoe(`{"Name":"P2三角低顺位远线站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${ex},"Y":0,"Z":${ey}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
              postAoe(`{"Name":"P2三角低顺位远线站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${ex},"Y":0,"Z":${ey}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
              data.moveBuffer=`{"X":${ex},"Y":0,"Z":${ey}}`;
            }
            if (myNum==4) {
              var ex=100+fr4dx;
              var ey=100-fr4dy;
              postAoe(`{"Name":"P2方块低顺位远线站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${ex},"Y":0,"Z":${ey}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
              postAoe(`{"Name":"P2方块低顺位远线站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${ex},"Y":0,"Z":${ey}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
              data.moveBuffer=`{"X":${ex},"Y":0,"Z":${ey}}`;
            }
          }
        }
      },
    },
    { id: 'TOP P2一运五钢铁',
      type: 'Ability',
      netRegex: { id: '7B21'},
      run: async (data, matches) => {
        let dur=11;
        let col=1073774847;


        // TODO: filter this by the combatants added right before Party Synergy???
        let combatantData = (await callOverlayHandler({
          call: 'getCombatants',
        })).combatants;
        const omegaMNPCId = 15714;
        const omegaFNPCId = 15715;
        for (const c of combatantData) {
          if (c.BNpcID === 15713 ||c.BNpcID === 15714) {
              postAoe(`{"Name":"P2一运五男人钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":${c.ID},"Radius":10,"Color":${col},"Delay":0,"During":${dur}}`);
          }
          
        }
      },
    },
    { id: 'TOP P2一运分摊收集',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data) => data.阶段 === 'P2协作程序PT',
      run: (data, matches) => {
        const id = getHeadmarkerId(data, matches);
        if (id !=`0064`) return;
        if (data.stack===undefined) data.stack=[];
        data.stack.push((parseInt(matches.targetId, 16)));
      },
    },
    { id: 'TOP P2一运分摊位置',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data) => data.阶段 === 'P2协作程序PT',
      delaySeconds:0.5,
      suppressSeconds:2,
      run: async (data, matches) => {
        const id = getHeadmarkerId(data, matches);
        if (id !=`0064`) return;
        let left=[];
        let right=[];
        for (let i = 1; i < 5; i++){
          if (data.HTDHParty.indexOf(data.点名列表[i][0])<data.HTDHParty.indexOf(data.点名列表[i][1])) {
            left.push(data.点名列表[i][0]);
            right.push(data.点名列表[i][1]);
          }else{
            left.push(data.点名列表[i][1]);
            right.push(data.点名列表[i][0]);
          }
        }
        
        if(left.indexOf(data.stack[0])==left.indexOf(data.stack[1]))
        {
          //双右
          let a=right.indexOf(data.stack[0]);
          let b=right.indexOf(data.stack[1])
          if(data.故障Buff=='mid')
          {
            if (b>a) {
              var buffer=right[b];
              right[b]=left[b];
              left[b]=buffer;
            }else{
              var buffer=right[a];
              right[a]=left[a];
              left[a]=buffer;
            }
          }
          if (data.故障Buff=='remote')
          {
            if (b>a) {
              var buffer=right[a];
              right[a]=left[a];
              left[a]=buffer;
            }else{
              var buffer=right[b];
              right[b]=left[b];
              left[b]=buffer;
              
            }

          }
          
        }else if (right.indexOf(data.stack[0])==right.indexOf(data.stack[1])) {
          //双左
          let a=left.indexOf(data.stack[0]);
          let b=left.indexOf(data.stack[1]);
          if (b>a) {
            var buffer=right[b];
            right[b]=left[b];
            left[b]=buffer;
          }else{
            var buffer=right[a];
            right[a]=left[a];
            left[a]=buffer;
          }
        }
        
        let combatantData = (await callOverlayHandler({
          call: 'getCombatants',
        })).combatants;
        let mx=100;
        let my=100;
        for (const c of combatantData) {
          if (c.BNpcID === 15713) {
              mx=c.PosX-100;
              my=c.PosY-100;
              break;
          }
        }
        let rot=(1-(Math.atan2(mx,my)/Math.PI))%2*180;
        
        if (data.故障Buff=='mid')
        {
          var d=2;
        }
        else
        {
          d=6;
        }

        let lx=Math.sin((rot-90)/180*Math.PI)*d;
        let ly=Math.cos((rot-90)/180*Math.PI)*d;
        let rx=Math.sin((rot+90)/180*Math.PI)*d;
        let ry=Math.cos((rot+90)/180*Math.PI)*d;
        let cx=Math.sin((rot+180)/180*Math.PI)*d;
        let cy=Math.cos((rot+180)/180*Math.PI)*d;
        let ex=100;
        let ey=100;
        if (left.indexOf(data.myId)!=-1) {
          ex+=lx;
          ey-=ly;
        }else{
          if (data.故障Buff=='mid') {
            ex+=cx;
            ey-=cy;
          }else{
            ex+=rx;
            ey-=ry;
          }
        }
        let dur=5;
        postAoe(`{"Name":"P2一运分摊位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${ex},"Y":0,"Z":${ey}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`)
        postAoe(`{"Name":"P2一运分摊位置连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${ex},"Y":0,"Z":${ey}},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`)
        data.moveBuffer=`{"X":${ex},"Y":0,"Z":${ey}}`;

      },
    },
    { id: 'TOP P2二运射手天剑',
      type: 'StartsUsing',
      netRegex: { id: '7B33'},
      condition: (data) => data.阶段 === 'P2协作程序LB',
      run: async (data, matches) => {
        data.p2date=(new Date()).valueOf();
        postAoe(`{"Name":"P2二运射手天剑","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":42,"Width":10,"Rotation":0.0,"Color":1073807359,"Delay":0.5,"During":7.5}`);
      },
    },
    { id: 'TOP P2二运刀光剑舞',
      type: 'Tether',
      netRegex: { id: '0054'},
      condition: (data) => data.阶段 === 'P2协作程序LB',
      run: async (data, matches) => {
        if(data.p2date===undefined) data.p2date=(new Date()).valueOf();
        if(data.p2刀光剑舞连线人===undefined) data.p2刀光剑舞连线人={};
        removeAoe(`P2二运连线顺劈${matches.sourceId}-${data.p2刀光剑舞连线人[matches.sourceId]}`);
        data.p2刀光剑舞连线人[matches.sourceId]=matches.targetId;

        let now=(new Date()).valueOf();
        let delay= 4-(now-data.p2date)/1000;
        let dur=15;
        
        postAoe(`{"Name":"P2二运连线顺劈${matches.sourceId}-${matches.targetId}","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Radius":40,"Angle":90,"Rotation":0.0,"Color":1073807359,"Delay":${delay},"During":${dur}}`);
      },
    },
    { id: 'TOP P2二运刀光剑舞引导点',
      type: 'StartsUsing',
      netRegex: { id: ['7B34','7B35']},
      condition: (data) => data.阶段 === 'P2协作程序LB',
      run: async (data, matches) => {
        let rr = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.targetId, 16)],
        });
        let result=rr.combatants[0];
        let x=(result.PosX-100)*0.4357+100;
        let y=(result.PosY-100)*1.1748+100;
        postAoe(`{"Name":"TOP P2二运刀光剑舞引导点","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${x},"Y":0,"Z":${y}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":8}`);
      },
    },
    { id: 'TOP P2二运刀光剑舞移除',
      type: 'Ability',
      netRegex: { id: '7B33', capture: false },
      run: async (data, matches) => {
        removeAoe(`RemoveAll`);
      },
    },
    { id: 'TOP P2二运刀光剑舞位置连线',
      type: 'StartsUsing',
      netRegex: { id: ['7B34','7B35']},
      run: async (data, matches) => {
        let a = data.HTDHParty.indexOf(data.myId);
        if (a == 1 && matches.y<100) {
          postAoe(`{"Name":"P2二运MT刀光剑舞连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"ActorId","Centre2Value":0x${matches.sourceId},"Thikness":5,"Color":4278255360,"Delay":0,"During":8}`);
        }
        if (a == 2 && matches.y>100) {
          postAoe(`{"Name":"P2二运MT刀光剑舞连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"ActorId","Centre2Value":0x${matches.sourceId},"Thikness":5,"Color":4278255360,"Delay":0,"During":8}`);
        }
      },
    },
    { id: 'TOP P2二运盾连击S',
      type: 'StartsUsing',
      netRegex: { id: '7B27'},
      run: async (data, matches) => {
        let delay=2;
        let dur=3;
        if (data.阶段 === 'P2协作程序LB' )
        {
          delay=0;
          dur=5;
        }
        postAoe(`{"Name":"P2二运盾连击S第一下","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"Nearest","TrackValue":2,"Radius":5.0,"Color":1073807359,"Delay":${delay},"During":${dur}}`);
        postAoe(`{"Name":"P2二运盾连击S第二下","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"Nearest","TrackValue":1,"Radius":6.0,"Color":1073807359,"Delay":6,"During":3}`);
        let a = data.HTDHParty.indexOf(data.myId);

        if (data.阶段 === 'P2协作程序LB' && (a == 1 || a == 2)) {
          postAoe(`{"Name":"P2二运盾连击S男人连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"ActorId","Centre2Value":0x${matches.sourceId},"Thikness":5,"Color":4278255360,"Delay":0,"During":5}`);
        }
      },
    },
    { id: 'TOP P2二运盾连击S命中提示',
      type: 'Ability',
      netRegex: { id: '7B28'},
      suppressSeconds: 20,
      condition: Conditions.targetIsYou(),
      alertText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          cn: '出去出去',
        },
      },
    },
    { id: 'TOP P3开场手臂Aoe',
      type: 'Object',
      netRegex:
        /] ChatLog 00:0:106:(?<sourceId>[^:]{8}):[^:]*:0197:0000:00001E4[34]:/,
      condition: (data) => data.阶段 === 'P3开场',
      run: (data, matches) => {
        postAoe(`{"Name":"P3开场手臂Aoe","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":11,"Color":1073807359,"Delay":11,"During":3}`);

      },
    },
    { id: 'TOP P3开场buff',
      type: 'GainsEffect',
      netRegex: { effectId: ['D61', 'D62'] },
      run: (data, matches) => {
        if(data.p3开场分摊=== undefined) data.p3开场分摊=[];
        if(data.p3开场分散=== undefined) data.p3开场分散=[];
        
        if (matches.effectId== 'D61') data.p3开场分散.push(parseInt(matches.targetId, 16));
        if (matches.effectId== 'D62') data.p3开场分摊.push(parseInt(matches.targetId, 16));
      },
    },
    { id: 'TOP P3开场位置连线',
      type: 'GainsEffect',
      netRegex: { effectId: 'D61' },
      delaySeconds:0.5,
      suppressSeconds:10,
      run: (data, matches) => {
        let dur=19;

        if(data.triggerSetConfig.P3_Sort === 'HTDH')
        {
          var psl=data.HTDHParty;
        }
        if(data.triggerSetConfig.P3_Sort === 'TDH')
        {
          var psl=data.TDHParty;
        }
        let spreadList = [];
        let stackList = [];
        let nunList = [];
        for (let i = 0; i < 8; i++) {
          let a = psl[i];
          let k1 = data.p3开场分摊.indexOf(a);
          let k2 = data.p3开场分散.indexOf(a);
          if (k1 != -1) stackList.push(a);
          if (k2 != -1) spreadList.push(a);
          if (k1 == -1 && k2 == -1) nunList.push(a);
        }
        //9.5 16.45
        if (stackList[0] == data.myId) {
          postAoe(`{"Name":"分摊1","AoeType":"Link","CentreType":"ActorId","CentreValue":${stackList[0]},"Centre2Type":"PostionValue","Centre2Value":{"X":90.5,"Y":0,"Z":83.55},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
          data.moveBuffer = `{"X":90.5,"Y":0,"Z":83.55}`;
        }
        if (stackList[1] == data.myId) {
          postAoe(`{"Name":"分摊2","AoeType":"Link","CentreType":"ActorId","CentreValue":${stackList[1]},"Centre2Type":"PostionValue","Centre2Value":{"X":109.5,"Y":0,"Z":83.55},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
          data.moveBuffer = `{"X":109.5,"Y":0,"Z":83.55}`;
        }
        if (nunList[0] == data.myId) {
          postAoe(`{"Name":"闲人1","AoeType":"Link","CentreType":"ActorId","CentreValue":${nunList[0]},"Centre2Type":"PostionValue","Centre2Value":{"X":90.5,"Y":0,"Z":83.55},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
          data.moveBuffer = `{"X":90.5,"Y":0,"Z":83.55}`;
        }
        if (nunList[1] == data.myId) {
          postAoe(`{"Name":"闲人1","AoeType":"Link","CentreType":"ActorId","CentreValue":${nunList[1]},"Centre2Type":"PostionValue","Centre2Value":{"X":109.5,"Y":0,"Z":83.55},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
          data.moveBuffer = `{"X":109.5,"Y":0,"Z":83.55}`;
        }
        if (spreadList[0] == data.myId) {
          postAoe(`{"Name":"分散1","AoeType":"Link","CentreType":"ActorId","CentreValue":${spreadList[0]},"Centre2Type":"PostionValue","Centre2Value":{"X":81,"Y":0,"Z":100},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
          data.moveBuffer = `{"X":81,"Y":0,"Z":100}`;
        }
        if (spreadList[1] == data.myId) {
          postAoe(`{"Name":"分散2","AoeType":"Link","CentreType":"ActorId","CentreValue":${spreadList[1]},"Centre2Type":"PostionValue","Centre2Value":{"X":90.5,"Y":0,"Z":116.45},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
          data.moveBuffer = `{"X":90.5,"Y":0,"Z":116.45}`;
        }
        if (spreadList[2] == data.myId) {
          postAoe(`{"Name":"分散3","AoeType":"Link","CentreType":"ActorId","CentreValue":${spreadList[2]},"Centre2Type":"PostionValue","Centre2Value":{"X":109.5,"Y":0,"Z":116.45},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
          data.moveBuffer = `{"X":109.5,"Y":0,"Z":116.45}`;
        }
        if (spreadList[3] == data.myId) {
          postAoe(`{"Name":"分散4","AoeType":"Link","CentreType":"ActorId","CentreValue":${spreadList[3]},"Centre2Type":"PostionValue","Centre2Value":{"X":119,"Y":0,"Z":100},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
          data.moveBuffer = `{"X":119,"Y":0,"Z":100}`;
        }
      },
    },
    { id: 'TOP P3开场地震',
      type: 'StartsUsing',
      netRegex: { id: '7B4F'},
      condition: (data) => data.阶段 === 'P3开场',
      run: (data, matches) => {
        postAoe(`{"Name":"P3开场地震1","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":6,"Color":1073807359,"Delay":0,"During":5}`);
        postAoe(`{"Name":"P3开场地震2","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":12,"InnerRadius":6,"Color":1073807359,"Delay":5,"During":2}`);
        postAoe(`{"Name":"P3开场地震3","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":18,"InnerRadius":12,"Color":1073807359,"Delay":7,"During":2}`);
        postAoe(`{"Name":"P3开场地震4","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":24,"InnerRadius":18,"Color":1073807359,"Delay":9,"During":2}`);
      },
    },
    { id: 'TOP P3小电视buff采集',
      type: 'GainsEffect',
      // D7C = Oversampled Wave Cannon Loading (facing right)
      // D7D = Oversampled Wave Cannon Loading (facing left)
      netRegex: { effectId: ['D7C', 'D7D'] },
      run: (data, matches) => {
        if (data.小电视玩家===undefined) data.小电视玩家=[];
        data.小电视玩家.push(parseInt(matches.targetId, 16));
        if (matches.target==data.me) {
          data.myTvBuff=matches.effectId;
        }
      },
      
    },
    { id: 'TOP P3小电视站位',
      type: 'StartsUsing',
      netRegex: { id: ['7B6B','7B6C']},
      //7B6B 东
      //7B6C 西
      delaySeconds:0.5,
      run: (data, matches) => {
        let debugMode=false;
        let dur=10;

        let dx=1;
        if (matches.id=='7B6B')  dx=-1;
        let attack=[];
        let spread=[];
        for (let i = 0; i < 8; i++) {
          let id=data.HTDHParty[i];
          if(data.小电视玩家.indexOf(id)!=-1)
          {
            attack.push(id);
          }else{
            spread.push(id);
          }
        }

        if(attack[0]==data.myId || debugMode)
        {
          postAoe(`{"Name":"P3小电视1站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${attack[0]},"Centre2Type":"PostionValue","Centre2Value":{"X":${100+4.6*dx},"Y":0,"Z":83},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P3小电视1站位位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${100+4.6*dx},"Y":0,"Z":83},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P3小电视1南北线","AoeType":"Link","CentreType":"PostionValue","CentreValue":{"X":${100+4.6*dx},"Y":0,"Z":80.0},"Centre2Type":"PostionValue","Centre2Value":{"X":${100+4.6*dx},"Y":0,"Z":90},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${100+4.6*dx},"Y":0,"Z":83}`;
          }
        }
        if(attack[1]==data.myId || debugMode)
        {
          postAoe(`{"Name":"P3小电视2站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${attack[1]},"Centre2Type":"PostionValue","Centre2Value":{"X":86.99,"Y":0,"Z":95.4},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P3小电视2站位位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":86.99,"Y":0,"Z":95.4},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P3小电视2南北线","AoeType":"Link","CentreType":"PostionValue","CentreValue":{"X":82,"Y":0,"Z":95.4},"Centre2Type":"PostionValue","Centre2Value":{"X":92,"Y":0,"Z":95.4},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":86.99,"Y":0,"Z":95.4}`;
          }
        }
        if(attack[2]==data.myId || debugMode)
        {
          postAoe(`{"Name":"P3小电视3站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${attack[2]},"Centre2Type":"PostionValue","Centre2Value":{"X":86.99,"Y":0,"Z":104.6},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P3小电视3站位位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":86.99,"Y":0,"Z":104.6},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P3小电视3南北线","AoeType":"Link","CentreType":"PostionValue","CentreValue":{"X":82,"Y":0,"Z":104.6},"Centre2Type":"PostionValue","Centre2Value":{"X":92,"Y":0,"Z":104.6},"Thikness":5,"Color":4278255360,"Delay":0,"During":5}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":86.99,"Y":0,"Z":104.6}`;
          }
        }
        if(spread[0]==data.myId || debugMode)
        {
          postAoe(`{"Name":"P3闲人1站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${spread[0]},"Centre2Type":"PostionValue","Centre2Value":{"X":${100+0.5*dx},"Y":0,"Z":91.8},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P3闲人1站位位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${100+0.5*dx},"Y":0,"Z":91.8},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${100+0.5*dx},"Y":0,"Z":91.8}`;
          }
        }
        if(spread[1]==data.myId || debugMode)
        {
          postAoe(`{"Name":"P3闲人2站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${spread[1]},"Centre2Type":"PostionValue","Centre2Value":{"X":108.2,"Y":0,"Z":100},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P3闲人2站位位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":108.2,"Y":0,"Z":100},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":108.2,"Y":0,"Z":100}`;
          }
        }
        if(spread[2]==data.myId || debugMode)
        {
          postAoe(`{"Name":"P3闲人3站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${spread[2]},"Centre2Type":"PostionValue","Centre2Value":{"X":119.5,"Y":0,"Z":100},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P3闲人3站位位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":119.5,"Y":0,"Z":100},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":119.5,"Y":0,"Z":100}`;
          }
        }
        if(spread[3]==data.myId || debugMode)
        {
          postAoe(`{"Name":"P3闲人4站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${spread[3]},"Centre2Type":"PostionValue","Centre2Value":{"X":${100+0.5*dx},"Y":0,"Z":108.2},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P3闲人4站位位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${100+0.5*dx},"Y":0,"Z":108.2},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${100+0.5*dx},"Y":0,"Z":108.2}`;
          }
        }
        if(spread[4]==data.myId || debugMode)
        {
          postAoe(`{"Name":"P3闲人5站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${spread[4]},"Centre2Type":"PostionValue","Centre2Value":{"X":${100+0.5*dx},"Y":0,"Z":119},"Thikness":5,"Color":4278255360,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P3闲人5站位位置","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${100+0.5*dx},"Y":0,"Z":119},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${100+0.5*dx},"Y":0,"Z":119}`;
          }
        }

      },
      
    },
    { id: 'TOP P3小电视设置面向',
      type: 'StartsUsing',
      netRegex: { id: ['7B6B','7B6C']},
      //7B6B 东
      //7B6C 西
      delaySeconds:0.5,
      run: (data, matches) => {
        // D7C = Oversampled Wave Cannon Loading (facing right)
        // D7D = Oversampled Wave Cannon Loading (facing left)
        if(!data.triggerSetConfig.P3_Face) return;
        if(data.myTvBuff===undefined) return;
        let attackRight=false;
        if(data.myTvBuff=='D7C') attackRight=true;
        let attackEast=false;
        if(matches.id=='7B6B') attackEast=true;
        let attack=[];
        
        for (let i = 0; i < 8; i++) {
          let id=data.HTDHParty[i];
          if(data.小电视玩家.indexOf(id)!=-1)
          {
            attack.push(id);
          }
        }

        if(attack[0]==data.myId)
        {
          if ((attackEast && !attackRight) || (!attackEast && attackRight))
          {
            var face=Math.PI;
          }else{
            var face=0;
          }
        }
        if(attack[1]==data.myId)
        {
          if (attackRight) {
            var face=-Math.PI/2;
          }else{
            var face=Math.PI/2;
          }
        }
        if(attack[2]==data.myId)
        {
          if (attackRight) {
            var face=Math.PI/2;
          }else{
            var face=-Math.PI/2;
          }
        }
        if (face!==undefined) {
          
          setFace(face,7,5);
        }
      },
    },
    { id: 'TOP P3 HW 分摊范围',
      type: 'GainsEffect',
      netRegex: { effectId: 'DC4'},
      run: (data, matches) => {
        postAoe(`{"Name":"TOP P3 HW 分摊范围","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":5,"Color":503381760,"Delay":19,"During":2}`);
      },
    },
    { id: 'TOP P3 HW 大圈范围',
      type: 'GainsEffect',
      netRegex: { effectId: 'DC5'},
      run: (data, matches) => {
        postAoe(`{"Name":"TOP P3 HW 大圈范围","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":20,"Color":503382015,"Delay":19,"During":2}`);
      },
    },
    { id: 'TOP P3 HW 红毒范围',
      type: 'GainsEffect',
      netRegex: { effectId: 'DC6'},
      run: (data, matches) => {
        postAoe(`{"Name":"TOP P3 HW 红毒范围","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":5,"Color":503382015,"Delay":24,"During":3}`);
      },
    },
    { id: 'TOP P3 HW 蓝毒范围',
      type: 'GainsEffect',
      netRegex: { effectId: 'D65'},
      run: (data, matches) => {
        postAoe(`{"Name":"TOP P3 HW 蓝毒范围","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":5,"Color":503382015,"Delay":24,"During":3}`);
      },
    },
    { id: 'TOP P4 第一段八方波动炮站位点',
      type: 'StartsUsing',
      netRegex: { id: '7B81'},
      run: (data, matches) => {
        postAoe(`{"Name":"TOP P4 第一段八方波动炮站位点","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":90.5,"Y":0,"Z":109.5},"Radius":0.3,"Color":1073807104,"Delay":0,"During":25}`);
        postAoe(`{"Name":"TOP P4 第一段八方波动炮站位点","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":87.5,"Y":0,"Z":105},"Radius":0.3,"Color":1073807104,"Delay":0,"During":25}`);
        postAoe(`{"Name":"TOP P4 第一段八方波动炮站位点","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":86.5,"Y":0,"Z":100},"Radius":0.3,"Color":1073807104,"Delay":0,"During":25}`);
        postAoe(`{"Name":"TOP P4 第一段八方波动炮站位点","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":87.5,"Y":0,"Z":94.5},"Radius":0.3,"Color":1073807104,"Delay":0,"During":25}`);
        postAoe(`{"Name":"TOP P4 第一段八方波动炮站位点","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":109.5,"Y":0,"Z":109.5},"Radius":0.3,"Color":1073807104,"Delay":0,"During":25}`);
        postAoe(`{"Name":"TOP P4 第一段八方波动炮站位点","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":112.5,"Y":0,"Z":105},"Radius":0.3,"Color":1073807104,"Delay":0,"During":25}`);
        postAoe(`{"Name":"TOP P4 第一段八方波动炮站位点","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":113.5,"Y":0,"Z":100},"Radius":0.3,"Color":1073807104,"Delay":0,"During":25}`);
        postAoe(`{"Name":"TOP P4 第一段八方波动炮站位点","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":112.5,"Y":0,"Z":94.5},"Radius":0.3,"Color":1073807104,"Delay":0,"During":25}`);
      },
    },
    { id: 'TOP P4 第一段八方波动炮命中提示',
      type: 'Ability',
      netRegex: { id: '7B7E'},
      suppressSeconds: 20,
      condition: Conditions.targetIsYou(),
      alertText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          cn: '走走走',
        },
      },
    },
    { id: 'TOP P4 第二段八方波动炮',
      type: 'StartsUsing',
      netRegex: { id: '7B80'},
      run: (data, matches) => {
        postAoe(`{"Name":"TOP P4 第二段八方波动炮","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":50,"Width":6,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":5}`); 
      },
    },
    { id: 'TOP P4地震',
      type: 'StartsUsing',
      netRegex: { id: '7B4F'},
      condition: (data) => data.阶段 === 'p4',
      run: (data, matches) => {
        postAoe(`{"Name":"P4地震1","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":6,"Color":1073742079,"Delay":0,"During":5}`);
        postAoe(`{"Name":"P4地震2","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":12,"InnerRadius":6,"Color":1073742079,"Delay":5,"During":2}`);
        postAoe(`{"Name":"P4地震3","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":18,"InnerRadius":12,"Color":1073742079,"Delay":7,"During":2}`);
        postAoe(`{"Name":"P4地震4","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":24,"InnerRadius":18,"Color":1073742079,"Delay":9,"During":2}`);
      },
    },
    { id: 'TOP P5 潜能量收集器',
      type: 'GainsEffect',
      netRegex: { effectId: 'D74'},
      run: (data, matches) => {
        if (data.P5潜能量计数器===undefined) data.P5潜能量计数器={};
        data.P5潜能量计数器[parseInt(matches.targetId, 16)]=parseInt(matches.count);
      },
    },
    { id: 'TOP P5 一运清除标记',
      type: 'StartsUsing',
      netRegex: { id: '7B88' },
      run: (data, matches) => {
        if (data.triggerSetConfig.P5_1Marker) {
          PostNamazuMarkClear();
        }
      },
    },
    { id: 'TOP P5 一运眼睛记录',
      type: 'Object',
      netRegex:
        /] ChatLog 00:0:103:.{8}:.{8}:00020001:0000000(?<x>[1-8]):/,
      condition: (data) => data.阶段 === 'delta',
      run: (data, matches) => {
        const dir = {
          '1': 0,
          '2': 1,
          '3': 2,
          '4': 3,
          '5': 4,
          '6': 5,
          '7': 6,
          '8': 7,
        }[matches.x];
        data.P5眼睛=dir;
      },
    },
    { id: 'TOP P5 一运buff收集',
      type: 'GainsEffect',
      //D73远处
      //D72近处
      netRegex: { effectId: ['D73', 'D72'] },
      condition: (data) => data.阶段 === 'delta',
      run: (data, matches) => {
        if (matches.effectId=='D73') {
          data.P5一运远点名= parseInt(matches.targetId, 16);
        }else{
          data.P5一运近点名= parseInt(matches.targetId, 16);
        }
      },
    },
    { id: 'TOP P5 一运线收集',
      type: 'Tether',
      netRegex: { id: ['00C8','00C9']},
      condition: (data) => data.阶段 === 'delta',
      run: (data, matches) => {
        let tid= parseInt(matches.targetId, 16);
        let sid= parseInt(matches.sourceId, 16);
        if (matches.id=='00C9') {
          if (data.P5一运远线===undefined) data.P5一运远线=[];
          data.P5一运远线.push([sid,tid]);
          
        }
        if (matches.id=='00C8') {
          if (data.P5一运近线===undefined) data.P5一运近线=[];
          if (data.HTDHParty.indexOf(sid)<data.HTDHParty.indexOf(tid)) 
          {
            data.P5一运近线.push([sid,tid]);
          }else{
            data.P5一运近线.push([tid,sid]);
          }
        }
      },
    },
    { id: 'TOP P5 一运引导飞拳站位',
      type: 'GainsEffect',
      //D73远处
      //D72近处
      netRegex: { effectId: 'D73' },
      condition: (data) => data.阶段 === 'delta',
      delaySeconds:0.3,
      suppressSeconds:2,
      run: (data, matches) => {
        let dur=8;
        let delay=8-dur;
        let debugMode=false;

        data.moveBuffer=undefined;
        data.moveBuffer2=undefined;

        let r=(data.P5眼睛+2);
        var 中心={posX:100,posY:100};
        var 远点名=RotatePointFromCentre({posX:109.2,posY:90.8},中心,45*r);
        var 远点名搭档=RotatePointFromCentre({posX:90.8,posY:90.8},中心,45*r);
        var 近点名=RotatePointFromCentre({posX:103,posY:86.9},中心,45*r);
        var 近点名搭档=RotatePointFromCentre({posX:97,posY:86.9},中心,45*r);
        var 近线1=RotatePointFromCentre({posX:90.8,posY:107.7},中心,45*r);
        var 近线2=RotatePointFromCentre({posX:109.2,posY:107.7},中心,45*r);
        var 近线3=RotatePointFromCentre({posX:90.8,posY:110.7},中心,45*r);
        var 近线4=RotatePointFromCentre({posX:109.2,posY:110.7},中心,45*r);

        



        if(data.P5一运远线[0][0]==data.P5一运远点名) data.P5一运远点名搭档 = data.P5一运远线[0][1];
        if(data.P5一运远线[0][1]==data.P5一运远点名) data.P5一运远点名搭档 = data.P5一运远线[0][0];
        if(data.P5一运远线[1][0]==data.P5一运远点名) data.P5一运远点名搭档 = data.P5一运远线[1][1];
        if(data.P5一运远线[1][1]==data.P5一运远点名) data.P5一运远点名搭档 = data.P5一运远线[1][0];

        if(data.P5一运远线[0][0]==data.P5一运近点名) data.P5一运近点名搭档 = data.P5一运远线[0][1];
        if(data.P5一运远线[0][1]==data.P5一运近点名) data.P5一运近点名搭档 = data.P5一运远线[0][0];
        if(data.P5一运远线[1][0]==data.P5一运近点名) data.P5一运近点名搭档 = data.P5一运远线[1][1];
        if(data.P5一运远线[1][1]==data.P5一运近点名) data.P5一运近点名搭档 = data.P5一运远线[1][0];


        if(data.HTDHParty.indexOf(data.P5一运近线[0][0])>data.HTDHParty.indexOf(data.P5一运近线[1][0]))
        {
          var buffer=data.P5一运近线[0];
          data.P5一运近线[0]=data.P5一运近线[1];
          data.P5一运近线[1]=buffer;
        }

        if (data.P5一运远点名==data.myId || debugMode) {
          postAoe(`{"Name":"P5一运远点名飞拳站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${远点名.posX},"Y":0,"Z":${远点名.posY}},"Radius":0.5,"Color":1073807104,"Delay":${delay},"During":${dur}}`);
          postAoe(`{"Name":"P5一运远点名飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运远点名},"Centre2Type":"PostionValue","Centre2Value":{"X":${远点名.posX},"Y":0,"Z":${远点名.posY}},"Thikness":10,"Color":4278255360,"Delay":${delay},"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${远点名.posX},"Y":0,"Z":${远点名.posY}}`;
          }
        }
        if (data.P5一运远点名搭档==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运远点名搭档飞拳站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${远点名搭档.posX},"Y":0,"Z":${远点名搭档.posY}},"Radius":0.5,"Color":1073807104,"Delay":${delay},"During":${dur}}`);
          postAoe(`{"Name":"P5一运远点名搭档飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运远点名搭档},"Centre2Type":"PostionValue","Centre2Value":{"X":${远点名搭档.posX},"Y":0,"Z":${远点名搭档.posY}},"Thikness":10,"Color":4278255360,"Delay":${delay},"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${远点名搭档.posX},"Y":0,"Z":${远点名搭档.posY}}`;
          }
        }
        if (data.P5一运近点名==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运近点名飞拳站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近点名.posX},"Y":0,"Z":${近点名.posY}},"Radius":0.5,"Color":1073807104,"Delay":${delay},"During":${dur}}`);
          postAoe(`{"Name":"P5一运近点名飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近点名},"Centre2Type":"PostionValue","Centre2Value":{"X":${近点名.posX},"Y":0,"Z":${近点名.posY}},"Thikness":10,"Color":4278255360,"Delay":${delay},"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${近点名.posX},"Y":0,"Z":${近点名.posY}}`;
          }
        }
        if (data.P5一运近点名搭档==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运远点名搭档飞拳站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近点名搭档.posX},"Y":0,"Z":${近点名搭档.posY}},"Radius":0.5,"Color":1073807104,"Delay":${delay},"During":${dur}}`);
          postAoe(`{"Name":"P5一运远点名搭档飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近点名搭档},"Centre2Type":"PostionValue","Centre2Value":{"X":${近点名搭档.posX},"Y":0,"Z":${近点名搭档.posY}},"Thikness":10,"Color":4278255360,"Delay":${delay},"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${近点名搭档.posX},"Y":0,"Z":${近点名搭档.posY}}`;
          }
        }

        if (data.P5一运近线[0][0]==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运近线1飞拳站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近线1.posX},"Y":0,"Z":${近线1.posY}},"Radius":0.5,"Color":1073807104,"Delay":${delay},"During":${dur}}`);
          postAoe(`{"Name":"P5一运近线1飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近线[0][0]},"Centre2Type":"PostionValue","Centre2Value":{"X":${近线1.posX},"Y":0,"Z":${近线1.posY}},"Thikness":10,"Color":4278255360,"Delay":${delay},"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${近线1.posX},"Y":0,"Z":${近线1.posY}}`;
          }
        }
        if (data.P5一运近线[0][1]==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运近线1飞拳站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近线2.posX},"Y":0,"Z":${近线2.posY}},"Radius":0.5,"Color":1073807104,"Delay":${delay},"During":${dur}}`);
          postAoe(`{"Name":"P5一运近线1飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近线[0][1]},"Centre2Type":"PostionValue","Centre2Value":{"X":${近线2.posX},"Y":0,"Z":${近线2.posY}},"Thikness":10,"Color":4278255360,"Delay":${delay},"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${近线2.posX},"Y":0,"Z":${近线2.posY}}`;
          }
        }
        if (data.P5一运近线[1][0]==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运近线1飞拳站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近线3.posX},"Y":0,"Z":${近线3.posY}},"Radius":0.5,"Color":1073807104,"Delay":${delay},"During":${dur}}`);
          postAoe(`{"Name":"P5一运近线1飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近线[1][0]},"Centre2Type":"PostionValue","Centre2Value":{"X":${近线3.posX},"Y":0,"Z":${近线3.posY}},"Thikness":10,"Color":4278255360,"Delay":${delay},"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${近线3.posX},"Y":0,"Z":${近线3.posY}}`;
          }
        }
        if (data.P5一运近线[1][1]==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运近线1飞拳站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近线4.posX},"Y":0,"Z":${近线4.posY}},"Radius":0.5,"Color":1073807104,"Delay":${delay},"During":${dur}}`);
          postAoe(`{"Name":"P5一运近线1飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近线[1][1]},"Centre2Type":"PostionValue","Centre2Value":{"X":${近线4.posX},"Y":0,"Z":${近线4.posY}},"Thikness":10,"Color":4278255360,"Delay":${delay},"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${近线4.posX},"Y":0,"Z":${近线4.posY}}`;
          }
        }

        if(data.triggerSetConfig.P5_1Marker)
        {
          sendMark({ActorID: data.P5一运远点名,MarkType: 'bind1',LocalOnly: false,});
          sendMark({ActorID: data.P5一运近点名,MarkType: 'bind2',LocalOnly: false,});
          sendMark({ActorID: data.P5一运近线[0][0],MarkType: 'attack1',LocalOnly: false,});
          sendMark({ActorID: data.P5一运近线[0][1],MarkType: 'attack2',LocalOnly: false,});
          sendMark({ActorID: data.P5一运近线[1][0],MarkType: 'attack3',LocalOnly: false,});
          sendMark({ActorID: data.P5一运近线[1][1],MarkType: 'attack4',LocalOnly: false,});
        }
      },
    },
    { id: 'TOP P5 一运飞拳收集',
      type: 'AddedCombatant',
      netRegex: { npcNameId: ['7696','7697']},
      condition: (data) => data.阶段 === 'delta',
      run: (data, matches) => {
        if(data.P5一运飞拳===undefined) data.P5一运飞拳=[];
        if(data.P5一运飞拳_id===undefined) data.P5一运飞拳_id=[];
        if (data.P5一运飞拳_id.indexOf(matches.id)==-1) {
          data.P5一运飞拳_id.push(matches.id);
          let adjustPos= RotatePointFromCentre({posX:matches.x,posY:matches.y},{posX:100,posY:100},(6-data.P5眼睛)*45);
          let k= Math.floor(2 - (2 * Math.atan2(adjustPos.posX - 100, adjustPos.posY - 100)) / Math.PI) % 4;
          if (data.P5一运飞拳[k]==undefined){
            data.P5一运飞拳[k]=matches.npcNameId;
          }else{
            if(k==0)
            {
              data.P5一运远线交换=(data.P5一运飞拳[k]==matches.npcNameId);
            }
            if (k==1) {
              data.P5一运近线交换=(data.P5一运飞拳[k]==matches.npcNameId);
            }
          }
        }
      },
    },
    { id: 'TOP P5 一运飞拳线交换站位站位',
      type: 'AddedCombatant',
      netRegex: { npcNameId: '7696'},
      condition: (data) => data.阶段 === 'delta',
      delaySeconds:0.5,
      suppressSeconds:2,
      run: (data, matches) => {
        let dur=9.3;
        let debugMode=false;


        let r=(data.P5眼睛+2);
        var 中心={posX:100,posY:100};
        var 远点名=RotatePointFromCentre({posX:109.2,posY:90.8},中心,45*r);
        var 远点名搭档=RotatePointFromCentre({posX:90.8,posY:90.8},中心,45*r);
        
        var 近点名=RotatePointFromCentre({posX:103,posY:90.8},中心,45*r);
        var 近点名搭档=RotatePointFromCentre({posX:97,posY:90.8},中心,45*r);
        var 近点名old=RotatePointFromCentre({posX:103,posY:90.8},中心,45*r);
        var 近点名搭档old=RotatePointFromCentre({posX:97,posY:90.8},中心,45*r);
        var 近线1=RotatePointFromCentre({posX:90.8,posY:109.2},中心,45*r);
        var 近线2=RotatePointFromCentre({posX:109.2,posY:109.2},中心,45*r);
        var 近线3=RotatePointFromCentre({posX:90.8,posY:109.2},中心,45*r);
        var 近线4=RotatePointFromCentre({posX:109.2,posY:109.2},中心,45*r);
        if (data.P5一运近线交换) {
          var b1=近线3;
          近线3=近线4;
          近线4=b1;
        }
        if (data.P5一运远线交换) {
          var b1=近点名;
          近点名=近点名搭档;
          近点名搭档=b1;
        }
        if (data.P5一运远点名==data.myId || debugMode) {
          postAoe(`{"Name":"P5一运远点名飞拳换位后站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${远点名.posX},"Y":0,"Z":${远点名.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5一运远点名飞拳换位后站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运远点名},"Centre2Type":"PostionValue","Centre2Value":{"X":${远点名.posX},"Y":0,"Z":${远点名.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5一运远点名炸线后站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近点名old.posX},"Y":0,"Z":${近点名old.posY}},"Radius":0.5,"Color":1073807104,"Delay":${dur},"During":2}`);
          postAoe(`{"Name":"P5一运远点名炸线后站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运远点名},"Centre2Type":"PostionValue","Centre2Value":{"X":${近点名old.posX},"Y":0,"Z":${近点名old.posY}},"Thikness":10,"Color":4278255360,"Delay":${dur},"During":2}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${远点名.posX},"Y":0,"Z":${远点名.posY}}`;
            data.moveBuffer2 = `{"X":${近点名old.posX},"Y":0,"Z":${近点名old.posY}}`;
          }
        }
        if (data.P5一运远点名搭档==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运远点名搭档飞拳换位后站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${远点名搭档.posX},"Y":0,"Z":${远点名搭档.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5一运远点名搭档飞拳换位后站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运远点名搭档},"Centre2Type":"PostionValue","Centre2Value":{"X":${远点名搭档.posX},"Y":0,"Z":${远点名搭档.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5一运远点名搭档炸线后站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近点名搭档old.posX},"Y":0,"Z":${近点名搭档old.posY}},"Radius":0.5,"Color":1073807104,"Delay":${dur},"During":2}`);
          postAoe(`{"Name":"P5一运远点名搭档炸线后站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运远点名搭档},"Centre2Type":"PostionValue","Centre2Value":{"X":${近点名搭档old.posX},"Y":0,"Z":${近点名搭档old.posY}},"Thikness":10,"Color":4278255360,"Delay":${dur},"During":2}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${远点名搭档.posX},"Y":0,"Z":${远点名搭档.posY}}`;
            data.moveBuffer2 = `{"X":${近点名搭档old.posX},"Y":0,"Z":${近点名搭档old.posY}}`;
          }
        }
        if (data.P5一运近点名==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运近点名飞拳换位后站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近点名.posX},"Y":0,"Z":${近点名.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5一运近点名飞拳换位后站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近点名},"Centre2Type":"PostionValue","Centre2Value":{"X":${近点名.posX},"Y":0,"Z":${近点名.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${近点名.posX},"Y":0,"Z":${近点名.posY}}`;
          }
        }
        if (data.P5一运近点名搭档==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运远点名搭档飞拳换位后站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近点名搭档.posX},"Y":0,"Z":${近点名搭档.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5一运远点名搭档飞拳换位后站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近点名搭档},"Centre2Type":"PostionValue","Centre2Value":{"X":${近点名搭档.posX},"Y":0,"Z":${近点名搭档.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${近点名搭档.posX},"Y":0,"Z":${近点名搭档.posY}}`;
          }
        }

        if (data.P5一运近线[0][0]==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运近线1飞拳换位后站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近线1.posX},"Y":0,"Z":${近线1.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5一运近线1飞拳换位后站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近线[0][0]},"Centre2Type":"PostionValue","Centre2Value":{"X":${近线1.posX},"Y":0,"Z":${近线1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${近线1.posX},"Y":0,"Z":${近线1.posY}}`;
          }
        }
        if (data.P5一运近线[0][1]==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运近线1飞拳换位后站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近线2.posX},"Y":0,"Z":${近线2.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5一运近线1飞拳换位后站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近线[0][1]},"Centre2Type":"PostionValue","Centre2Value":{"X":${近线2.posX},"Y":0,"Z":${近线2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${近线2.posX},"Y":0,"Z":${近线2.posY}}`;
          }
        }
        if (data.P5一运近线[1][0]==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运近线1飞拳换位后站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近线3.posX},"Y":0,"Z":${近线3.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5一运近线1飞拳换位后站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近线[1][0]},"Centre2Type":"PostionValue","Centre2Value":{"X":${近线3.posX},"Y":0,"Z":${近线3.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${近线3.posX},"Y":0,"Z":${近线3.posY}}`;
          }
        }
        if (data.P5一运近线[1][1]==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运近线1飞拳换位后站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近线4.posX},"Y":0,"Z":${近线4.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5一运近线1飞拳换位后站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近线[1][1]},"Centre2Type":"PostionValue","Centre2Value":{"X":${近线4.posX},"Y":0,"Z":${近线4.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${近线4.posX},"Y":0,"Z":${近线4.posY}}`;
          }
        }
      },
    },
    { id: 'TOP P5 一运飞拳去引导提示',
      type: 'Ability',
      netRegex: { id: '7B21' },
      condition: (data) => data.阶段 === 'delta',
      alarmText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          cn: '走走走',
        },
      },
    },
    { id: 'TOP P5 一运手臂引导点',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data) => data.阶段 === 'delta',
      run: async (data, matches) => {
        let dur=5;
        let delay=10-dur;
        // dur =999;
        let debugMode=false;
        const id = getHeadmarkerId(data, matches);
        if (id !=`009C` && id !=`009D`) return;

        let rr = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.targetId, 16)],
        });
        let result=rr.combatants[0];
        if (result.BNpcID!=15719 && result.BNpcID!=15718) return;
        let adjustPos=RotatePointFromCentre({posX:result.PosX,posY:result.PosY},{posX:100,posY:100},(6-data.P5眼睛)*45);
        let k= Math.floor(2 - (2 * Math.atan2(adjustPos.posX - 100, adjustPos.posY - 100)) / Math.PI) % 4;

        let rot=77;
        if (id==`009D`) rot=rot*-1;

        let epos= RotatePointFromCentre({posX:(result.PosX-100)*0.8+100,posY:(result.PosY-100)*0.8+100},{posX:result.PosX,posY:result.PosY},rot);
        


        if (Math.abs(adjustPos.posX-100)<1 || Math.abs(adjustPos.posY-100)<1) {
          if (k==0||k==1) {
            if (data.P5一运近线[0][1]==data.myId|| debugMode) {
              postAoe(`{"Name":"P5一运近线1飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近线[0][1]},"Centre2Type":"PostionValue","Centre2Value":{"X":${epos.posX},"Y":0,"Z":${epos.posY}},"Thikness":5,"Color":4278255360,"Delay":${delay},"During":${dur}}`);
              if(!debugMode)
              {
                data.moveBuffer = `{"X":${epos.posX},"Y":0,"Z":${epos.posY}}`;
              }
            } 
          }
          if (k==2||k==3) {
            if (data.P5一运近线[0][0]==data.myId|| debugMode) {
              postAoe(`{"Name":"P5一运近线1飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近线[0][0]},"Centre2Type":"PostionValue","Centre2Value":{"X":${epos.posX},"Y":0,"Z":${epos.posY}},"Thikness":5,"Color":4278255360,"Delay":${delay},"During":${dur}}`);
              if(!debugMode)
              {
                data.moveBuffer = `{"X":${epos.posX},"Y":0,"Z":${epos.posY}}`;
              }
            }
          }
        }else{
          if (k == 0) {
            if (data.P5一运远线交换) {
              if (data.P5一运近点名搭档 == data.myId || debugMode) {
                postAoe(`{"Name":"P5一运远点名飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近点名搭档},"Centre2Type":"PostionValue","Centre2Value":{"X":${epos.posX},"Y":0,"Z":${epos.posY}},"Thikness":5,"Color":4278255360,"Delay":${delay},"During":${dur}}`);
                if(!debugMode)
                {
                  data.moveBuffer = `{"X":${epos.posX},"Y":0,"Z":${epos.posY}}`;
                }
              }
            } else {
              if (data.P5一运近点名 == data.myId || debugMode) {
                postAoe(`{"Name":"P5一运远点名飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近点名},"Centre2Type":"PostionValue","Centre2Value":{"X":${epos.posX},"Y":0,"Z":${epos.posY}},"Thikness":5,"Color":4278255360,"Delay":${delay},"During":${dur}}`);
                if(!debugMode)
                {
                  data.moveBuffer = `{"X":${epos.posX},"Y":0,"Z":${epos.posY}}`;
                }
              }
            }
          }
          if (k == 3) {
            if (data.P5一运远线交换) {
              if (data.P5一运近点名 == data.myId || debugMode) {
                postAoe(`{"Name":"P5一运远点名飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近点名},"Centre2Type":"PostionValue","Centre2Value":{"X":${epos.posX},"Y":0,"Z":${epos.posY}},"Thikness":5,"Color":4278255360,"Delay":${delay},"During":${dur}}`);
                if(!debugMode)
                {
                  data.moveBuffer = `{"X":${epos.posX},"Y":0,"Z":${epos.posY}}`;
                }
              }
            } else {
              if (data.P5一运近点名搭档 == data.myId || debugMode) {
                postAoe(`{"Name":"P5一运远点名飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近点名搭档},"Centre2Type":"PostionValue","Centre2Value":{"X":${epos.posX},"Y":0,"Z":${epos.posY}},"Thikness":5,"Color":4278255360,"Delay":${delay},"During":${dur}}`);
                if(!debugMode)
                {
                  data.moveBuffer = `{"X":${epos.posX},"Y":0,"Z":${epos.posY}}`;
                }
              }
            }
          }
          if (k == 1) {
            if (data.P5一运近线交换) {
              if (data.P5一运近线[1][0] == data.myId || debugMode) {
                postAoe(`{"Name":"P5一运远点名飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近线[1][0]},"Centre2Type":"PostionValue","Centre2Value":{"X":${epos.posX},"Y":0,"Z":${epos.posY}},"Thikness":5,"Color":4278255360,"Delay":${delay},"During":${dur}}`);
                if(!debugMode)
                {
                  data.moveBuffer = `{"X":${epos.posX},"Y":0,"Z":${epos.posY}}`;
                }
              }
            } else {
              if (data.P5一运近线[1][1] == data.myId || debugMode) {
                postAoe(`{"Name":"P5一运远点名飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近线[1][1]},"Centre2Type":"PostionValue","Centre2Value":{"X":${epos.posX},"Y":0,"Z":${epos.posY}},"Thikness":5,"Color":4278255360,"Delay":${delay},"During":${dur}}`);
                if(!debugMode)
                {
                  data.moveBuffer = `{"X":${epos.posX},"Y":0,"Z":${epos.posY}}`;
                }
              }
            }
          }
          if (k == 2) {
            if (data.P5一运近线交换) {
              if (data.P5一运近线[1][1] == data.myId || debugMode) {
                postAoe(`{"Name":"P5一运远点名飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近线[1][1]},"Centre2Type":"PostionValue","Centre2Value":{"X":${epos.posX},"Y":0,"Z":${epos.posY}},"Thikness":5,"Color":4278255360,"Delay":${delay},"During":${dur}}`);
                if(!debugMode)
                {
                  data.moveBuffer = `{"X":${epos.posX},"Y":0,"Z":${epos.posY}}`;
                }
              }
            } else {
              if (data.P5一运近线[1][0] == data.myId || debugMode) {
                postAoe(`{"Name":"P5一运远点名飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近线[1][0]},"Centre2Type":"PostionValue","Centre2Value":{"X":${epos.posX},"Y":0,"Z":${epos.posY}},"Thikness":5,"Color":4278255360,"Delay":${delay},"During":${dur}}`);
                if(!debugMode)
                {
                  data.moveBuffer = `{"X":${epos.posX},"Y":0,"Z":${epos.posY}}`;
                }
              }
            }
          }
        }

      },
    },
    { id: 'TOP P5 一运飞踢引导点',
      type: 'Object',
      netRegex:
        /] ChatLog 00:0:106:(?<sourceId>[^:]{8}):[^:]*:0197:0000:00001E4(?<mid>[34]):/,
      suppressSeconds:2,
      condition: (data) => data.阶段 === 'delta',
      run: async (data, matches) => {
        let dur=5;
        let delay=12-dur;
        let debugMode=false;

        let rr = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let result=rr.combatants[0];
        if (result.BNpcID!=15719 && result.BNpcID!=15718) return;

        let r=(data.P5眼睛+2);

        let epos1= RotatePointFromCentre({posX:96,posY:100},{posX:100,posY:100},45*r);
        let epos2= RotatePointFromCentre({posX:104,posY:100},{posX:100,posY:100},45*r);
        if (data.P5一运远点名==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运飞踢引导点站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${epos2.posX},"Y":0,"Z":${epos2.posY}},"Radius":0.5,"Color":1073807104,"Delay":${delay},"During":${dur}}`);
          postAoe(`{"Name":"P5一运飞踢引导点站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运远点名},"Centre2Type":"PostionValue","Centre2Value":{"X":${epos2.posX},"Y":0,"Z":${epos2.posY}},"Thikness":10,"Color":4278255360,"Delay":${delay},"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${epos2.posX},"Y":0,"Z":${epos2.posY}}`;
          }
        }
        if (data.P5一运远点名搭档==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运飞踢引导点站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${epos1.posX},"Y":0,"Z":${epos1.posY}},"Radius":0.5,"Color":1073807104,"Delay":${delay},"During":${dur}}`);
          postAoe(`{"Name":"P5一运飞踢引导点站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运远点名搭档},"Centre2Type":"PostionValue","Centre2Value":{"X":${epos1.posX},"Y":0,"Z":${epos1.posY}},"Thikness":10,"Color":4278255360,"Delay":${delay},"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${epos1.posX},"Y":0,"Z":${epos1.posY}}`;
          }
        }

      },
    },
    { id: 'TOP P5 一运盾连击S命中采集',
      type: 'Ability',
      netRegex: { id: '7B28'},
      condition: (data) => data.阶段 === 'delta',
      run: (data, matches) => {
        data.P5一运盾连击S目标=parseInt(matches.targetId, 16);
      },
    },
    { id: 'TOP P5 一运小电视buff采集',
      type: 'GainsEffect',
      // D7C = Oversampled Wave Cannon Loading (facing right)
      // D7D = Oversampled Wave Cannon Loading (facing left)
      netRegex: { effectId: ['D7C', 'D7D'] },
      condition: (data) => data.阶段 === 'delta',
      run: (data, matches) => {
        data.P5一运小电视={id:parseInt(matches.targetId, 16),effectId:matches.effectId};
        
      },
    },
    { id: 'TOP P5 一运小电视站位',
      type: 'StartsUsing',
      netRegex: { id: ['7B96','7B97']},
      //7B96 以A为北打西
      //7B97 以A为北打东
      delaySeconds:5.5,
      condition: (data) => data.阶段 === 'delta',
      run: (data, matches) => {
        let dur=4.5;
        let debugMode=false;
        if (debugMode) {
          dur=999
        }

        let r=(2+data.P5眼睛);
        var 中心={posX:100,posY:100};
        //近线组固定
        var 近线1=RotatePointFromCentre({posX:87,posY:100},中心,45*r);
        var 近线2=RotatePointFromCentre({posX:113,posY:100},中心,45*r);
        var 近线3=RotatePointFromCentre({posX:90.8,posY:109.2},中心,45*r);
        var 近线4=RotatePointFromCentre({posX:109.2,posY:109.2},中心,45*r);
        if (data.P5一运近线交换) {
          var b1=近线3;
          近线3=近线4;
          近线4=b1;
        }

        //远线组
        let dx=-1;
        if (matches.id=='7B96') dx=1;
        var 飞踢电视_电视=RotatePointFromCentre({posX:6*dx+100,posY:87},中心,45*r);
        var 飞踢电视_分摊=RotatePointFromCentre({posX:100+dx*2,posY:100},中心,45*r);

        var 飞踢闲人_飞踢=RotatePointFromCentre({posX:100+dx*1,posY:87},中心,45*r);
        var 飞踢闲人_分摊闲人=RotatePointFromCentre({posX:100+dx*2,posY:100},中心,45*r);
        var 飞踢闲人_分摊电视=RotatePointFromCentre({posX:5*dx+100,posY:100},中心,45*r);


        if (data.P5一运近线[0][0]==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运近线1小电视站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近线1.posX},"Y":0,"Z":${近线1.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5一运近线1小电视站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近线[0][0]},"Centre2Type":"PostionValue","Centre2Value":{"X":${近线1.posX},"Y":0,"Z":${近线1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${近线1.posX},"Y":0,"Z":${近线1.posY}}`;
          }
        }
        if (data.P5一运近线[0][1]==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运近线1小电视站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近线2.posX},"Y":0,"Z":${近线2.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5一运近线1小电视站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近线[0][1]},"Centre2Type":"PostionValue","Centre2Value":{"X":${近线2.posX},"Y":0,"Z":${近线2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${近线2.posX},"Y":0,"Z":${近线2.posY}}`;
          }
        }
        if (data.P5一运近线[1][0]==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运近线1小电视站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近线3.posX},"Y":0,"Z":${近线3.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5一运近线1小电视站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近线[1][0]},"Centre2Type":"PostionValue","Centre2Value":{"X":${近线3.posX},"Y":0,"Z":${近线3.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${近线3.posX},"Y":0,"Z":${近线3.posY}}`;
          }
        }
        if (data.P5一运近线[1][1]==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运近线1小电视站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近线4.posX},"Y":0,"Z":${近线4.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5一运近线1小电视站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近线[1][1]},"Centre2Type":"PostionValue","Centre2Value":{"X":${近线4.posX},"Y":0,"Z":${近线4.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${近线4.posX},"Y":0,"Z":${近线4.posY}}`;
          }
        }
        if(data.P5一运盾连击S目标==data.P5一运小电视.id)
        {
          //飞踢电视
          if (data.P5一运盾连击S目标==data.myId|| debugMode) {
            postAoe(`{"Name":"P5一运飞踢电视小电视站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${飞踢电视_电视.posX},"Y":0,"Z":${飞踢电视_电视.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5一运飞踢电视小电视站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运盾连击S目标},"Centre2Type":"PostionValue","Centre2Value":{"X":${飞踢电视_电视.posX},"Y":0,"Z":${飞踢电视_电视.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${飞踢电视_电视.posX},"Y":0,"Z":${飞踢电视_电视.posY}}`;
            }
          }

          if (data.P5一运盾连击S目标!=data.P5一运远点名 && (data.P5一运远点名==data.myId || debugMode)) {
            postAoe(`{"Name":"P5一运远点名电视站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${飞踢电视_分摊.posX},"Y":0,"Z":${飞踢电视_分摊.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5一运远点名电视站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运远点名},"Centre2Type":"PostionValue","Centre2Value":{"X":${飞踢电视_分摊.posX},"Y":0,"Z":${飞踢电视_分摊.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${飞踢电视_分摊.posX},"Y":0,"Z":${飞踢电视_分摊.posY}}`;
            }
          }
          if (data.P5一运盾连击S目标!=data.P5一运远点名搭档 && (data.P5一运远点名搭档==data.myId|| debugMode)){
            postAoe(`{"Name":"P5一运远点名搭档电视站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${飞踢电视_分摊.posX},"Y":0,"Z":${飞踢电视_分摊.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5一运远点名搭档电视站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运远点名搭档},"Centre2Type":"PostionValue","Centre2Value":{"X":${飞踢电视_分摊.posX},"Y":0,"Z":${飞踢电视_分摊.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${飞踢电视_分摊.posX},"Y":0,"Z":${飞踢电视_分摊.posY}}`;
            }
          }
          if (data.P5一运盾连击S目标!=data.P5一运近点名 && (data.P5一运近点名==data.myId|| debugMode)) {
            postAoe(`{"Name":"P5一运近点名电视站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${飞踢电视_分摊.posX},"Y":0,"Z":${飞踢电视_分摊.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5一运近点名电视站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近点名},"Centre2Type":"PostionValue","Centre2Value":{"X":${飞踢电视_分摊.posX},"Y":0,"Z":${飞踢电视_分摊.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${飞踢电视_分摊.posX},"Y":0,"Z":${飞踢电视_分摊.posY}}`;
            }
          }
          if (data.P5一运盾连击S目标!=data.P5一运近点名搭档 && (data.P5一运近点名搭档==data.myId|| debugMode)) {
            postAoe(`{"Name":"P5一运远点名搭档电视站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${飞踢电视_分摊.posX},"Y":0,"Z":${飞踢电视_分摊.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5一运远点名搭档电视站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近点名搭档},"Centre2Type":"PostionValue","Centre2Value":{"X":${飞踢电视_分摊.posX},"Y":0,"Z":${飞踢电视_分摊.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${飞踢电视_分摊.posX},"Y":0,"Z":${飞踢电视_分摊.posY}}`;
            }
          }
        }else{

          //飞踢闲人
          if (data.P5一运盾连击S目标==data.myId|| debugMode) {
            postAoe(`{"Name":"P5一运飞踢目标闲人站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${飞踢闲人_飞踢.posX},"Y":0,"Z":${飞踢闲人_飞踢.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5一运飞踢目标闲人站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运盾连击S目标},"Centre2Type":"PostionValue","Centre2Value":{"X":${飞踢闲人_飞踢.posX},"Y":0,"Z":${飞踢闲人_飞踢.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${飞踢闲人_飞踢.posX},"Y":0,"Z":${飞踢闲人_飞踢.posY}}`;
            }
          }
          if (data.P5一运小电视.id==data.myId|| debugMode) {
            postAoe(`{"Name":"P5一运飞踢闲人电视站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${飞踢闲人_分摊电视.posX},"Y":0,"Z":${飞踢闲人_分摊电视.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5一运飞踢闲人电视站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运小电视.id},"Centre2Type":"PostionValue","Centre2Value":{"X":${飞踢闲人_分摊电视.posX},"Y":0,"Z":${飞踢闲人_分摊电视.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${飞踢闲人_分摊电视.posX},"Y":0,"Z":${飞踢闲人_分摊电视.posY}}`;
            }
          }

          if (data.P5一运小电视.id!=data.P5一运远点名 && data.P5一运盾连击S目标!=data.P5一运远点名 && (data.P5一运远点名==data.myId || debugMode)) {
            postAoe(`{"Name":"P5一运远点名电视站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${飞踢闲人_分摊闲人.posX},"Y":0,"Z":${飞踢闲人_分摊闲人.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5一运远点名电视站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运远点名},"Centre2Type":"PostionValue","Centre2Value":{"X":${飞踢闲人_分摊闲人.posX},"Y":0,"Z":${飞踢闲人_分摊闲人.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${飞踢闲人_分摊闲人.posX},"Y":0,"Z":${飞踢闲人_分摊闲人.posY}}`;
            }
          }
          if (data.P5一运小电视.id!=data.P5一运远点名搭档 && data.P5一运盾连击S目标!=data.P5一运远点名搭档 && (data.P5一运远点名搭档==data.myId|| debugMode)){
            postAoe(`{"Name":"P5一运远点名搭档电视站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${飞踢闲人_分摊闲人.posX},"Y":0,"Z":${飞踢闲人_分摊闲人.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5一运远点名搭档电视站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运远点名搭档},"Centre2Type":"PostionValue","Centre2Value":{"X":${飞踢闲人_分摊闲人.posX},"Y":0,"Z":${飞踢闲人_分摊闲人.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${飞踢闲人_分摊闲人.posX},"Y":0,"Z":${飞踢闲人_分摊闲人.posY}}`;
            }
          }
          if (data.P5一运小电视.id!=data.P5一运近点名 && data.P5一运盾连击S目标!=data.P5一运近点名 && (data.P5一运近点名==data.myId|| debugMode)) {
            postAoe(`{"Name":"P5一运近点名电视站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${飞踢闲人_分摊闲人.posX},"Y":0,"Z":${飞踢闲人_分摊闲人.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5一运近点名电视站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近点名},"Centre2Type":"PostionValue","Centre2Value":{"X":${飞踢闲人_分摊闲人.posX},"Y":0,"Z":${飞踢闲人_分摊闲人.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${飞踢闲人_分摊闲人.posX},"Y":0,"Z":${飞踢闲人_分摊闲人.posY}}`;
            }
          }
          if (data.P5一运小电视.id!=data.P5一运近点名搭档 && data.P5一运盾连击S目标!=data.P5一运近点名搭档 && (data.P5一运近点名搭档==data.myId|| debugMode)) {
            postAoe(`{"Name":"P5一运近点名搭档电视站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${飞踢闲人_分摊闲人.posX},"Y":0,"Z":${飞踢闲人_分摊闲人.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5一运近点名搭档电视站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近点名搭档},"Centre2Type":"PostionValue","Centre2Value":{"X":${飞踢闲人_分摊闲人.posX},"Y":0,"Z":${飞踢闲人_分摊闲人.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${飞踢闲人_分摊闲人.posX},"Y":0,"Z":${飞踢闲人_分摊闲人.posY}}`;
            }
          }

        }
      },
    },
    { id: 'TOP P5 一运小电视设置面向',
      type: 'StartsUsing',
      netRegex: { id: ['7B96','7B97']},
      //7B96 以A为北打西
      //7B97 以A为北打东
      delaySeconds:0.5,
      condition: (data) => data.阶段 === 'delta',
      run: async (data, matches) => {
        let rr = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let head=rr.combatants[0].Heading;
        if ((matches.id=='7B96' && data.P5一运小电视.effectId=='D7C')||(matches.id=='7B97' && data.P5一运小电视.effectId=='D7D')) {
          head=head+Math.PI;
        }
        if (data.P5一运小电视.id==data.myId) {
          if(!data.triggerSetConfig.P5_Face) return;
          setFace(head,6,5);
        }
      },
    },
    { id: 'TOP P5 一运小电视提醒拉断线',
      type: 'Ability',
      netRegex: { id: ['7B96','7B97']},
      //7B96 以A为北打西
      //7B97 以A为北打东
      delaySeconds:7,
      condition: (data) => data.阶段 === 'delta',
      infoText: (data, matches) => {
        return `第一组拉断`
        },
    },
    { id: 'TOP P5 一运小电视提醒拉断线2',
      type: 'Ability',
      netRegex: { id: ['8110']},
      //7B96 以A为北打西
      //7B97 以A为北打东
      delaySeconds:7,
      condition: (data) => data.阶段 === 'delta',
      infoText: (data, matches) => {
        return `第二组拉断`
        },
    },
    { id: 'TOP P5 一运你好远近世界引导点',
      type: 'StartsUsing',
      netRegex: { id: ['7B94','7B95']},
      run: (data, matches) => {
        let dur=10;
        // dur=999;
        let debugMode=false;


        let dx=1;
        if (matches.id=='7B94') dx=-1;
        let r=(data.P5眼睛+2);
        var 中心={posX:100,posY:100};
        var 攻击1=RotatePointFromCentre({posX:100+0.7*dx,posY:119.5},中心,45*r);
        var 攻击2=RotatePointFromCentre({posX:100+10.4*dx,posY:83.5},中心,45*r);
        var 攻击3=RotatePointFromCentre({posX:100+9.2*dx,posY:109.2},中心,45*r);
        var 攻击4=RotatePointFromCentre({posX:100+13.70*dx,posY:113.7},中心,45*r);
        var 锁链1=RotatePointFromCentre({posX:100+19.3*dx,posY:101.5},中心,45*r);
        var 锁链2=RotatePointFromCentre({posX:100+5.5*dx,posY:100},中心,45*r);
        var 闲人=RotatePointFromCentre({posX:100+17*dx,posY:90.8},中心,45*r);
        data.moveBuffer=undefined;
        data.moveBuffer2=undefined;

        if (data.P5一运远点名==data.myId || debugMode) {
          postAoe(`{"Name":"P5一运远点名飞拳站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${锁链1.posX},"Y":0,"Z":${锁链1.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5一运远点名飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运远点名},"Centre2Type":"PostionValue","Centre2Value":{"X":${锁链1.posX},"Y":0,"Z":${锁链1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${锁链1.posX},"Y":0,"Z":${锁链1.posY}}`;
          }
        }
        if (data.P5一运远点名搭档==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运远点名搭档飞拳站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${闲人.posX},"Y":0,"Z":${闲人.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5一运远点名搭档飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运远点名搭档},"Centre2Type":"PostionValue","Centre2Value":{"X":${闲人.posX},"Y":0,"Z":${闲人.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${闲人.posX},"Y":0,"Z":${闲人.posY}}`;
          }
        }
        if (data.P5一运近点名==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运近点名飞拳站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${锁链2.posX},"Y":0,"Z":${锁链2.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5一运近点名飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近点名},"Centre2Type":"PostionValue","Centre2Value":{"X":${锁链2.posX},"Y":0,"Z":${锁链2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${锁链2.posX},"Y":0,"Z":${锁链2.posY}}`;
          }
        }
        if (data.P5一运近点名搭档==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运远点名搭档飞拳站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${闲人.posX},"Y":0,"Z":${闲人.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5一运远点名搭档飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近点名搭档},"Centre2Type":"PostionValue","Centre2Value":{"X":${闲人.posX},"Y":0,"Z":${闲人.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${闲人.posX},"Y":0,"Z":${闲人.posY}}`;
          }
        }

        if (data.P5一运近线[0][0]==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运近线1飞拳站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${攻击1.posX},"Y":0,"Z":${攻击1.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5一运近线1飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近线[0][0]},"Centre2Type":"PostionValue","Centre2Value":{"X":${攻击1.posX},"Y":0,"Z":${攻击1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${攻击1.posX},"Y":0,"Z":${攻击1.posY}}`;
          }
        }
        if (data.P5一运近线[0][1]==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运近线2飞拳站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${攻击2.posX},"Y":0,"Z":${攻击2.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5一运近线2飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近线[0][1]},"Centre2Type":"PostionValue","Centre2Value":{"X":${攻击2.posX},"Y":0,"Z":${攻击2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${攻击2.posX},"Y":0,"Z":${攻击2.posY}}`;
          }
        }
        if (data.P5一运近线[1][0]==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运近线3飞拳站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${攻击3.posX},"Y":0,"Z":${攻击3.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5一运近线3飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近线[1][0]},"Centre2Type":"PostionValue","Centre2Value":{"X":${攻击3.posX},"Y":0,"Z":${攻击3.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer2 = `{"X":${攻击3.posX},"Y":0,"Z":${攻击3.posY}}`;
          }
        }
        if (data.P5一运近线[1][1]==data.myId|| debugMode) {
          postAoe(`{"Name":"P5一运近线4飞拳站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${攻击4.posX},"Y":0,"Z":${攻击4.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5一运近线4飞拳站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5一运近线[1][1]},"Centre2Type":"PostionValue","Centre2Value":{"X":${攻击4.posX},"Y":0,"Z":${攻击4.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer2 = `{"X":${攻击4.posX},"Y":0,"Z":${攻击4.posY}}`;
          }
        }
      },
    },
    { id: 'TOP P5 二运男人ID记录',
      type: 'StartsUsing',
      netRegex: { id: '8014'},
      run: (data, matches) => {
        data.P5二运男人id=parseInt(matches.sourceId,16);
        if (data.triggerSetConfig.P5_2Marker) {
          PostNamazuMarkClear();
        }
      },
    },
    { id: 'TOP P5 二运索尼收集器',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data) => data.阶段 === 'sigma',
      run: (data, matches) => {
        const id = getHeadmarkerId(data, matches);
        const headmarkers = {
          // vfx/lockon/eff/z3oz_firechain_01c.avfx through 04c
          '01A0':1,
          '01A1':3,
          '01A2':4,
          '01A3':2,
        };
        const num = headmarkers[id];
        if (num === undefined)
          return;
        if (data.P5二运索尼 === undefined) data.P5二运索尼 = [];
        if (data.P5二运索尼[num] === undefined) data.P5二运索尼[num] = [];
        data.P5二运索尼[num].push(parseInt(matches.targetId, 16));
        if (matches.target == data.me) {
          data.自己点名 = num;
        }
      },
    },
    { id: 'TOP P5 二运远近世界buff收集',
      type: 'GainsEffect',
      //D73远处
      //D72近处
      netRegex: { effectId: ['D73', 'D72'] },
      condition: (data) => data.阶段 === 'sigma',
      run: (data, matches) => {
        if (matches.effectId=='D73') {
          data.P5二运远世界点名= parseInt(matches.targetId, 16);
        }else{
          data.P5二运近世界点名= parseInt(matches.targetId, 16);
        }
      },
    },
    { id: 'TOP P5 二运中远程故障buff',
      type: 'GainsEffect',
      // D63 = Mid Glitch
      // D64 = Remote Glitch
      netRegex: { effectId: ['D63', 'D64'] },
      condition: (data) => data.阶段 === 'sigma',
      suppressSeconds: 10,
      run: (data, matches) => data.故障Buff = matches.effectId === 'D63' ? 'mid' : 'remote',
    },
    { id: 'TOP P5 二运前半段引导站位及标记',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data) => data.阶段 === 'sigma',
      run: async (data, matches) => {
        const id = getHeadmarkerId(data, matches);
        if (id!='00F4') return;
        if (data.P5二运扇形 === undefined) data.P5二运扇形 = [];
        data.P5二运扇形.push(parseInt(matches.targetId, 16));
        if (data.P5二运扇形.length!=6) return;

        let psort=data.TDHParty;
        let debugMode=false;
        let dur=9;
        if(debugMode)
        {
          dur=999;
        }


        //0:攻击1
        //1:锁链1
        //2:圆圈
        //3:攻击4
        //4:攻击2;
        //5:锁链3;
        //6:攻击3;
        //7:锁链2;
        //没点名的靠前，索尼小的靠前
        let finishSort=[];
        for (let i = 0; i < 8; i++) {
          if(data.P5二运扇形.indexOf(psort[i])==-1)
            finishSort.push(psort[i]);
        }
        for (let i = 1; i < 5; i++) {
          if (data.P5二运索尼[i][0]==finishSort[0]) finishSort[2]=data.P5二运索尼[i][1];
          if (data.P5二运索尼[i][1]==finishSort[0]) finishSort[2]=data.P5二运索尼[i][0];

          if (data.P5二运索尼[i][0]==finishSort[1]) finishSort[3]=data.P5二运索尼[i][1];
          if (data.P5二运索尼[i][1]==finishSort[1]) finishSort[3]=data.P5二运索尼[i][0];
        }

        let free2=[];
        for (let i = 1; i < 5; i++) {
          if (finishSort.indexOf(data.P5二运索尼[i][0])==-1)
          {
            if (psort.indexOf(data.P5二运索尼[i][0])>psort.indexOf(data.P5二运索尼[i][1])) {
              var b=data.P5二运索尼[i][0];
              data.P5二运索尼[i][0]=data.P5二运索尼[i][1];
              data.P5二运索尼[i][1]=b;
            }
            free2.push(data.P5二运索尼[i]);
          } 
        }
        

        finishSort[4]=free2[0][0];//攻击2;
        finishSort[5]=free2[0][1];//锁链3;
        finishSort[6]=free2[1][0];//攻击3;
        finishSort[7]=free2[1][1];//锁链2;

        data.P5二运前半段顺序=finishSort;

        if (data.triggerSetConfig.P5_2Marker) {
          //0:攻击1
          //1:锁链1
          //2:圆圈
          //3:攻击4
          //4:攻击2;
          //5:锁链3;
          //6:攻击3;
          //7:锁链2;
          //没点名的靠前
          sendMark({ ActorID: finishSort[0], MarkType: 'attack1', LocalOnly: false, });
          sendMark({ ActorID: finishSort[1], MarkType: 'bind1', LocalOnly: false, });
          sendMark({ ActorID: finishSort[2], MarkType: 'circle', LocalOnly: false, });
          sendMark({ ActorID: finishSort[3], MarkType: 'attack4', LocalOnly: false, });
          sendMark({ ActorID: finishSort[4], MarkType: 'attack2', LocalOnly: false, });
          sendMark({ ActorID: finishSort[5], MarkType: 'bind3', LocalOnly: false, });
          sendMark({ ActorID: finishSort[6], MarkType: 'attack3', LocalOnly: false, });
          sendMark({ ActorID: finishSort[7], MarkType: 'bind2', LocalOnly: false, });
        }
        

        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [data.P5二运男人id],
        });
        let r = Math.round(
          Math.round(4 - (4 * Math.atan2(result.combatants[0].PosX - 100, result.combatants[0].PosY - 100)) / Math.PI) % 8
        );

        
        var 中心={posX:100,posY:100};

        //极限距离26m
        var 内左1=RotatePointFromCentre({posX:95.03,posY:87.99},中心,45*r);
        var 内左2=RotatePointFromCentre({posX:89.84,posY:95.79},中心,45*r);
        var 内左3=RotatePointFromCentre({posX:89.84,posY:104.21},中心,45*r);
        var 内左4=RotatePointFromCentre({posX:95.79,posY:110.16},中心,45*r);
        var 内右1=RotatePointFromCentre({posX:104.97,posY:87.99},中心,45*r);
        var 内右2=RotatePointFromCentre({posX:110.16,posY:95.79},中心,45*r);
        var 内右3=RotatePointFromCentre({posX:110.16,posY:104.21},中心,45*r);
        var 内右4=RotatePointFromCentre({posX:104.21,posY:110.16},中心,45*r);


        //极限距离34m
        var 外左1=RotatePointFromCentre({posX:92.73,posY:82.45},中心,45*r);
        var 外左2=RotatePointFromCentre({posX:83.37,posY:93.11},中心,45*r);
        var 外左3=RotatePointFromCentre({posX:82.45,posY:107.27},中心,45*r);
        var 外左4=RotatePointFromCentre({posX:92.73,posY:117.55},中心,45*r);
        var 外右1=RotatePointFromCentre({posX:107.27,posY:82.45},中心,45*r);
        var 外右2=RotatePointFromCentre({posX:116.63,posY:93.11},中心,45*r);
        var 外右3=RotatePointFromCentre({posX:117.55,posY:107.27},中心,45*r);
        var 外右4=RotatePointFromCentre({posX:107.27,posY:117.55},中心,45*r);

        if (data.故障Buff=='mid') {
          if (finishSort[0]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位内1","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${内左1.posX},"Y":0,"Z":${内左1.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线内1","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[0]},"Centre2Type":"PostionValue","Centre2Value":{"X":${内左1.posX},"Y":0,"Z":${内左1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${内左1.posX},"Y":0,"Z":${内左1.posY}}`;
            }
          }
          if (finishSort[1]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位内0","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${内右1.posX},"Y":0,"Z":${内右1.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线内0","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[1]},"Centre2Type":"PostionValue","Centre2Value":{"X":${内右1.posX},"Y":0,"Z":${内右1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${内右1.posX},"Y":0,"Z":${内右1.posY}}`;
            }
          }
          if (finishSort[2]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位内3","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${内右4.posX},"Y":0,"Z":${内右4.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线内3","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[2]},"Centre2Type":"PostionValue","Centre2Value":{"X":${内右4.posX},"Y":0,"Z":${内右4.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${内右4.posX},"Y":0,"Z":${内右4.posY}}`;
            }
          }
          if (finishSort[3]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位内2","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${内左4.posX},"Y":0,"Z":${内左4.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线内2","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[3]},"Centre2Type":"PostionValue","Centre2Value":{"X":${内左4.posX},"Y":0,"Z":${内左4.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${内左4.posX},"Y":0,"Z":${内左4.posY}}`;
            }
          }
          if (finishSort[4]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位内4","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${内左2.posX},"Y":0,"Z":${内左2.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线内4","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[4]},"Centre2Type":"PostionValue","Centre2Value":{"X":${内左2.posX},"Y":0,"Z":${内左2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${内左2.posX},"Y":0,"Z":${内左2.posY}}`;
            }
          }
          if (finishSort[5]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位内5","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${内右3.posX},"Y":0,"Z":${内右3.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线内5","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[5]},"Centre2Type":"PostionValue","Centre2Value":{"X":${内右3.posX},"Y":0,"Z":${内右3.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${内右3.posX},"Y":0,"Z":${内右3.posY}}`;
            }
          }
          if (finishSort[6]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位内6","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${内左3.posX},"Y":0,"Z":${内左3.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线内6","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[6]},"Centre2Type":"PostionValue","Centre2Value":{"X":${内左3.posX},"Y":0,"Z":${内左3.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${内左3.posX},"Y":0,"Z":${内左3.posY}}`;
            }
          }
          if (finishSort[7]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位内7","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${内右2.posX},"Y":0,"Z":${内右2.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线内7","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[7]},"Centre2Type":"PostionValue","Centre2Value":{"X":${内右2.posX},"Y":0,"Z":${内右2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${内右2.posX},"Y":0,"Z":${内右2.posY}}`;
            }
          }
        }else{
          if (finishSort[0]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位外1","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${外左1.posX},"Y":0,"Z":${外左1.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线外1","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[0]},"Centre2Type":"PostionValue","Centre2Value":{"X":${外左1.posX},"Y":0,"Z":${外左1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${外左1.posX},"Y":0,"Z":${外左1.posY}}`;
            }
          }
          if (finishSort[1]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位外0","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${外右1.posX},"Y":0,"Z":${外右1.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线外0","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[1]},"Centre2Type":"PostionValue","Centre2Value":{"X":${外右1.posX},"Y":0,"Z":${外右1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${外右1.posX},"Y":0,"Z":${外右1.posY}}`;
            }
          }
          if (finishSort[2]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位外3","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${外右4.posX},"Y":0,"Z":${外右4.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线外3","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[2]},"Centre2Type":"PostionValue","Centre2Value":{"X":${外右4.posX},"Y":0,"Z":${外右4.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${外右4.posX},"Y":0,"Z":${外右4.posY}}`;
            }
          }
          if (finishSort[3]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位外2","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${外左4.posX},"Y":0,"Z":${外左4.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线外2","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[3]},"Centre2Type":"PostionValue","Centre2Value":{"X":${外左4.posX},"Y":0,"Z":${外左4.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${外左4.posX},"Y":0,"Z":${外左4.posY}}`;
            }
          }
          if (finishSort[4]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位外4","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${外左2.posX},"Y":0,"Z":${外左2.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线外4","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[4]},"Centre2Type":"PostionValue","Centre2Value":{"X":${外左2.posX},"Y":0,"Z":${外左2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${外左2.posX},"Y":0,"Z":${外左2.posY}}`;
            }
          }
          if (finishSort[5]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位外5","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${外右3.posX},"Y":0,"Z":${外右3.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线外5","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[5]},"Centre2Type":"PostionValue","Centre2Value":{"X":${外右3.posX},"Y":0,"Z":${外右3.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${外右3.posX},"Y":0,"Z":${外右3.posY}}`;
            }
          }
          if (finishSort[6]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位外6","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${外左3.posX},"Y":0,"Z":${外左3.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线外6","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[6]},"Centre2Type":"PostionValue","Centre2Value":{"X":${外左3.posX},"Y":0,"Z":${外左3.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${外左3.posX},"Y":0,"Z":${外左3.posY}}`;
            }
          }
          if (finishSort[7]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位外7","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${外右2.posX},"Y":0,"Z":${外右2.posY}},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线外7","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[7]},"Centre2Type":"PostionValue","Centre2Value":{"X":${外右2.posX},"Y":0,"Z":${外右2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${外右2.posX},"Y":0,"Z":${外右2.posY}}`;
            }
          }
        }

      },
    },
    { id: 'TOP P5 二运塔位置收集',
      type: 'Object',
      netRegex:
        /] ChatLog 00:0:101:.{8}:0005:(?<id>.{4}):1EB83(?<type>[DE]):E0000000:(?<x>.+?):(?<y>.+?):/,
      condition: (data) => data.阶段 === 'sigma',
      run: (data, matches) => {
        let x = parseFloat(matches.x);
        let y = parseFloat(matches.y);
        let pos=0;
        if (data.故障Buff=='mid')
        {
          pos = Math.round(
            Math.floor(4 - (4 * Math.atan2(x - 100, y - 100)) / Math.PI) % 8
          );
        }else{
          pos = Math.round(
            Math.round(4 - (4 * Math.atan2(x - 100, y - 100)) / Math.PI) % 8
          );
        }
        if (data.P5二运塔===undefined) data.P5二运塔=[0,0,0,0,0,0,0,0];
        if (matches.type=='D') {
          data.P5二运塔[pos]=1;
        }
        if (matches.type=='E') {
          data.P5二运塔[pos]=2;
        }
      },
    },
    { id: 'TOP P5 二运莫灵喵踩塔击退点',
      type: 'Object',
      netRegex:
        /] ChatLog 00:0:101:.{8}:0005:(?<id>.{4}):1EB83(?<type>[DE]):E0000000:(?<x>.+?):(?<y>.+?):/,
      condition: (data) => (data.阶段 === 'sigma' && data.triggerSetConfig.P5_2Tower === 'MLM'),
      delaySeconds:0.5,
      suppressSeconds:2,
      run: async (data, matches) => {

        let debugMode=false;
        let dur=10;
        // dur=999;


        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [data.P5二运男人id],
        });
        let r = Math.round(
          Math.round(4 - (4 * Math.atan2(result.combatants[0].PosX - 100, result.combatants[0].PosY - 100)) / Math.PI) % 8
        );
        let tr=0;
        if(data.P5二运塔[(r+1)%8]!=0) tr=180;

        var 中心={posX:100,posY:100};

        if (data.故障Buff=='mid') {
          var 左1=RotatePointFromCentre({posX:98.47,posY:96.3},中心,45*r+tr);
          var 左2=RotatePointFromCentre({posX:96.3,posY:101.53},中心,45*r+tr);
          var 左3=RotatePointFromCentre({posX:98.47,posY:103.7},中心,45*r+tr);
          var 右1=RotatePointFromCentre({posX:101.53,posY:96.3},中心,45*r+tr);
          var 右2=RotatePointFromCentre({posX:103.7,posY:101.53},中心,45*r+tr);
          var 右3=RotatePointFromCentre({posX:101.53,posY:103.7},中心,45*r+tr);


          //0:攻击1
          //1:锁链1
          //2:圆圈
          //3:攻击4
          //4:攻击2;
          //5:锁链3;
          //6:攻击3;
          //7:锁链2;
          
          if (data.P5二运前半段顺序[0]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位内1","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${右1.posX},"Y":0,"Z":${右1.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线内1","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5二运前半段顺序[0]},"Centre2Type":"PostionValue","Centre2Value":{"X":${右1.posX},"Y":0,"Z":${右1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${右1.posX},"Y":0,"Z":${右1.posY}}`;
            }
          }
          if (data.P5二运前半段顺序[1]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位内0","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${左1.posX},"Y":0,"Z":${左1.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线内0","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5二运前半段顺序[1]},"Centre2Type":"PostionValue","Centre2Value":{"X":${左1.posX},"Y":0,"Z":${左1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${左1.posX},"Y":0,"Z":${左1.posY}}`;
            }
          }
          if (data.P5二运前半段顺序[2]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位内3","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${右2.posX},"Y":0,"Z":${右2.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线内3","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5二运前半段顺序[2]},"Centre2Type":"PostionValue","Centre2Value":{"X":${右2.posX},"Y":0,"Z":${右2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${右2.posX},"Y":0,"Z":${右2.posY}}`;
            }
          }
          if (data.P5二运前半段顺序[3]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位内2","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${左2.posX},"Y":0,"Z":${左2.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线内2","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5二运前半段顺序[3]},"Centre2Type":"PostionValue","Centre2Value":{"X":${左2.posX},"Y":0,"Z":${左2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${左2.posX},"Y":0,"Z":${左2.posY}}`;
            }
          }
          if (data.P5二运前半段顺序[4]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位内4","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${左2.posX},"Y":0,"Z":${左2.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线内4","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5二运前半段顺序[4]},"Centre2Type":"PostionValue","Centre2Value":{"X":${左2.posX},"Y":0,"Z":${左2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${左2.posX},"Y":0,"Z":${左2.posY}}`;
            }
          }
          if (data.P5二运前半段顺序[5]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位内5","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${右3.posX},"Y":0,"Z":${右3.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线内5","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5二运前半段顺序[5]},"Centre2Type":"PostionValue","Centre2Value":{"X":${右3.posX},"Y":0,"Z":${右3.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${右3.posX},"Y":0,"Z":${右3.posY}}`;
            }
          }
          if (data.P5二运前半段顺序[6]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位内6","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${左3.posX},"Y":0,"Z":${左3.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线内6","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5二运前半段顺序[6]},"Centre2Type":"PostionValue","Centre2Value":{"X":${左3.posX},"Y":0,"Z":${左3.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${左3.posX},"Y":0,"Z":${左3.posY}}`;
            }
          }
          if (data.P5二运前半段顺序[7]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位内7","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${右2.posX},"Y":0,"Z":${右2.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线内7","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5二运前半段顺序[7]},"Centre2Type":"PostionValue","Centre2Value":{"X":${右2.posX},"Y":0,"Z":${右2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${右2.posX},"Y":0,"Z":${右2.posY}}`;
            }
          }

        }else{
          ///0:锁链1
          ///1:攻击1
          ///2:攻击4
          //3:圆圈
          ///4:攻击2;
          ///5:锁链3;
          ///6:攻击3;
          ///7:锁链2;
          var 上=RotatePointFromCentre({posX:100,posY:93.5},中心,45*r+tr);
          var 左1=RotatePointFromCentre({posX:93.5,posY:100},中心,45*r+tr);
          var 左2=RotatePointFromCentre({posX:95.4,posY:104.6},中心,45*r+tr);
          var 右1=RotatePointFromCentre({posX:106.5,posY:100},中心,45*r+tr);
          var 右2=RotatePointFromCentre({posX:104.6,posY:104.6},中心,45*r+tr);
          
          if (data.P5二运前半段顺序[0]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位内1","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${上.posX},"Y":0,"Z":${上.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线内1","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5二运前半段顺序[0]},"Centre2Type":"PostionValue","Centre2Value":{"X":${上.posX},"Y":0,"Z":${上.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${上.posX},"Y":0,"Z":${上.posY}}`;
            }
          }
          if (data.P5二运前半段顺序[1]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位内0","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${上.posX},"Y":0,"Z":${上.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线内0","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5二运前半段顺序[1]},"Centre2Type":"PostionValue","Centre2Value":{"X":${上.posX},"Y":0,"Z":${上.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${上.posX},"Y":0,"Z":${上.posY}}`;
            }
          }
          if (data.P5二运前半段顺序[2]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位内3","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${右2.posX},"Y":0,"Z":${右2.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线内3","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5二运前半段顺序[2]},"Centre2Type":"PostionValue","Centre2Value":{"X":${右2.posX},"Y":0,"Z":${右2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${右2.posX},"Y":0,"Z":${右2.posY}}`;
            }
          }
          if (data.P5二运前半段顺序[3]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位内2","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${左2.posX},"Y":0,"Z":${左2.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线内2","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5二运前半段顺序[3]},"Centre2Type":"PostionValue","Centre2Value":{"X":${左2.posX},"Y":0,"Z":${左2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${左2.posX},"Y":0,"Z":${左2.posY}}`;
            }
          }
          if (data.P5二运前半段顺序[4]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位内4","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${左1.posX},"Y":0,"Z":${左1.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线内4","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5二运前半段顺序[4]},"Centre2Type":"PostionValue","Centre2Value":{"X":${左1.posX},"Y":0,"Z":${左1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${左1.posX},"Y":0,"Z":${左1.posY}}`;
            }
          }
          if (data.P5二运前半段顺序[5]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位内5","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${右2.posX},"Y":0,"Z":${右2.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线内5","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5二运前半段顺序[5]},"Centre2Type":"PostionValue","Centre2Value":{"X":${右2.posX},"Y":0,"Z":${右2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${右2.posX},"Y":0,"Z":${右2.posY}}`;
            }
          }
          if (data.P5二运前半段顺序[6]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位内6","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${左2.posX},"Y":0,"Z":${左2.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线内6","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5二运前半段顺序[6]},"Centre2Type":"PostionValue","Centre2Value":{"X":${左2.posX},"Y":0,"Z":${左2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${左2.posX},"Y":0,"Z":${左2.posY}}`;
            }
          }
          if (data.P5二运前半段顺序[7]==data.myId || debugMode) {
            postAoe(`{"Name":"P5二运扇形站位内7","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${右1.posX},"Y":0,"Z":${右1.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
            postAoe(`{"Name":"P5二运扇形站位连线内7","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P5二运前半段顺序[7]},"Centre2Type":"PostionValue","Centre2Value":{"X":${右1.posX},"Y":0,"Z":${右1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
            if(!debugMode)
            {
              data.moveBuffer = `{"X":${右1.posX},"Y":0,"Z":${右1.posY}}`;
            }
          }



        }
      },
    },
    { id: 'TOP P5 二运无脑塔踩塔击退点',
      type: 'Object',
      netRegex:
        /] ChatLog 00:0:101:.{8}:0005:(?<id>.{4}):1EB83(?<type>[DE]):E0000000:(?<x>.+?):(?<y>.+?):/,
      condition: (data) => (data.阶段 === 'sigma' && data.triggerSetConfig.P5_2Tower === 'Fool'),
      delaySeconds:0.5,
      suppressSeconds:2,
      run: async (data, matches) => {

        let debugMode=false;
        let dur=10;
        // dur=999;


        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [data.P5二运男人id],
        });
        let r = Math.round(
          Math.round(4 - (4 * Math.atan2(result.combatants[0].PosX - 100, result.combatants[0].PosY - 100)) / Math.PI) % 8
        );

        //0:攻击1
        //1:锁链1
        //2:圆圈
        //3:攻击4
        //4:攻击2;
        //5:锁链3;
        //6:攻击3;
        //7:锁链2;
        let ps = [];
        ps[(0+r)%8] = data.P5二运前半段顺序[1];
        ps[(1+r)%8] = data.P5二运前半段顺序[7];
        ps[(2+r)%8] = data.P5二运前半段顺序[5];
        ps[(3+r)%8] = data.P5二运前半段顺序[2];
        ps[(4+r)%8] = data.P5二运前半段顺序[3];
        ps[(5+r)%8] = data.P5二运前半段顺序[6];
        ps[(6+r)%8] = data.P5二运前半段顺序[4];
        ps[(7+r)%8] = data.P5二运前半段顺序[0];

        var 中心 = { posX: 100, posY: 100 };
        for (let i = 0; i < 8; i++) {
          if (ps[i] == data.myId || debugMode) {
            let lid = i;
            let off=0;
            let y=93.5;
            if (data.故障Buff == 'mid')
            {
              lid = (i + 7) % 8;
              off=22.5;
              y=96;
            } 
            let nid = (i + 1) % 8;
            if (data.P5二运塔[lid] == 2 || (data.P5二运塔[lid] == 1 && data.P5二运塔[nid] == 0)) {
              var p = RotatePointFromCentre({ posX: 100, posY: y }, 中心, 45 * lid + off);
              postAoe(`{"Name":"P5二运${data.故障Buff}无脑塔${i}","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${p.posX},"Y":0,"Z":${p.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
              postAoe(`{"Name":"P5二运${data.故障Buff}无脑塔${i}连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${ps[i]},"Centre2Type":"PostionValue","Centre2Value":{"X":${p.posX},"Y":0,"Z":${p.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
              if(!debugMode)
              {
                data.moveBuffer = `{"X":${p.posX},"Y":0,"Z":${p.posY}}`;
              }
            }
            if (data.P5二运塔[nid] == 2 || (data.P5二运塔[nid] == 1 && data.P5二运塔[lid] == 0)) {
              var p = RotatePointFromCentre({ posX: 100, posY: y }, 中心, 45 * nid + off);
              postAoe(`{"Name":"P5二运${data.故障Buff}无脑塔${i}","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${p.posX},"Y":0,"Z":${p.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
              postAoe(`{"Name":"P5二运${data.故障Buff}无脑塔${i}连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${ps[i]},"Centre2Type":"PostionValue","Centre2Value":{"X":${p.posX},"Y":0,"Z":${p.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
              if(!debugMode)
              {
                data.moveBuffer = `{"X":${p.posX},"Y":0,"Z":${p.posY}}`;
              }
            }
          }
        }
      },
    },
    { id: 'TOP P5 二运击退清除标记',
      type: 'Ability',
      netRegex: { id: '7B2E' },
      condition: (data) => data.阶段 === 'sigma',
      run: (data, matches) => {
        if (data.triggerSetConfig.P5_2Marker) {
          PostNamazuMarkClear();
        }
      },
    },
    { id: 'TOP P5 二运远近世界引导点',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data) => data.阶段 === 'sigma',
      run: async (data, matches) => {
        let dur=11;
        let debugMode=false;
        if (debugMode) {
          dur =999;
        }
        const id = getHeadmarkerId(data, matches);
        if (id !=`009C` && id !=`009D`) return;


        //0:锁链1 远世界
        //1:锁链2 近世界
        //2:禁止1
        //3:禁止2  
        //4:攻击1 
        //5:攻击2 
        //6:攻击3 
        //7:攻击4 
        let finishSort=[];
        finishSort[0]=data.P5二运远世界点名;
        finishSort[1]=data.P5二运近世界点名;
        for (let i = 0; i < 8; i++) {
          let b= data.TDHParty[i];
          if (finishSort.indexOf(b)==-1 && data.P5潜能量计数器[b]>0) {
            finishSort[2]=b;
            break;
          }
        }
        for (let i = 0; i < 8; i++) {
          let b= data.TDHParty[i];
          if (finishSort.indexOf(b)==-1 && data.P5潜能量计数器[b]>0) {
            finishSort[3]=b;
            break;
          }
        }
        for (let i = 0; i < 8; i++) {
          let b= data.TDHParty[i];
          if (finishSort.indexOf(b)==-1) {
            finishSort.push(b);
          }
        }


        if(data.triggerSetConfig.P5_2Marker)
        {
          //0:锁链1 远世界
          //1:锁链2 近世界
          //2:禁止1
          //3:禁止2  
          //4:攻击1 
          //5:攻击2 
          //6:攻击3 
          //7:攻击4 
          sendMark({ActorID: finishSort[0],MarkType: 'bind1',LocalOnly: false,});
          sendMark({ActorID: finishSort[1],MarkType: 'bind2',LocalOnly: false,});
          sendMark({ActorID: finishSort[2],MarkType: 'stop1',LocalOnly: false,});
          sendMark({ActorID: finishSort[3],MarkType: 'stop2',LocalOnly: false,});
          sendMark({ActorID: finishSort[4],MarkType: 'attack1',LocalOnly: false,});
          sendMark({ActorID: finishSort[5],MarkType: 'attack2',LocalOnly: false,});
          sendMark({ActorID: finishSort[6],MarkType: 'attack3',LocalOnly: false,});
          sendMark({ActorID: finishSort[7],MarkType: 'attack4',LocalOnly: false,});
        }


        let result = await callOverlayHandler({
          call: 'getCombatants',
          ids: [data.P5二运男人id],
        });
        let r = Math.round(
          Math.round(4 - (4 * Math.atan2(result.combatants[0].PosX - 100, result.combatants[0].PosY - 100)) / Math.PI) % 8
        );
        let dx=1;
        if(id ==`009C`) dx=-1;


        var 中心={posX:100,posY:100};
        var 手引导1=RotatePointFromCentre({posX:86.56,posY:86.56},中心,45*r);
        var 手引导2=RotatePointFromCentre({posX:113.44,posY:86.56},中心,45*r);

        var 近buff=RotatePointFromCentre({posX:94.74,posY:118.26},中心,45*r);
        var 近引导1=RotatePointFromCentre({posX:102,posY:111},中心,45*r);
        var 近引导2=RotatePointFromCentre({posX:105.26,posY:118.26},中心,45*r);

        var 远buff=RotatePointFromCentre({posX:100+dx*10,posY:100},中心,45*r);
        var 远引导1=RotatePointFromCentre({posX:100+(-19.5*dx),posY:100},中心,45*r);
        var 远引导2=RotatePointFromCentre({posX:100+19.5*dx,posY:100},中心,45*r);

        var 等待点1=RotatePointFromCentre({posX:100+7*dx,posY:82},中心,45*r);
        var 等待点2=RotatePointFromCentre({posX:100-7*dx,posY:118},中心,45*r);

        data.moveBuffer=undefined;
        data.moveBuffer2=undefined;
        
        //0:锁链1 远世界
        //1:锁链2 近世界
        //2:禁止1
        //3:禁止2  
        //4:攻击1 
        //5:攻击2 
        //6:攻击3 
        //7:攻击4 

        if (finishSort[0]==data.myId || debugMode) {
          postAoe(`{"Name":"P5二运尾巴安全点","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${等待点2.posX},"Y":0,"Z":${等待点2.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":9}`);
          postAoe(`{"Name":"P5二运尾巴安全点连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[0]},"Centre2Type":"PostionValue","Centre2Value":{"X":${等待点2.posX},"Y":0,"Z":${等待点2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":9}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${等待点2.posX},"Y":0,"Z":${等待点2.posY}}`;
          }
          postAoe(`{"Name":"P5二运扇形站位外0","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${远buff.posX},"Y":0,"Z":${远buff.posY}},"Radius":0.3,"Color":1073807104,"Delay":9,"During":${dur}}`);
          postAoe(`{"Name":"P5二运扇形站位连线外0","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[0]},"Centre2Type":"PostionValue","Centre2Value":{"X":${远buff.posX},"Y":0,"Z":${远buff.posY}},"Thikness":10,"Color":4278255360,"Delay":9,"During":${dur}}`);
        }
        if (finishSort[1]==data.myId || debugMode) {
          postAoe(`{"Name":"P5二运尾巴安全点","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${等待点2.posX},"Y":0,"Z":${等待点2.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":9}`);
          postAoe(`{"Name":"P5二运尾巴安全点连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[1]},"Centre2Type":"PostionValue","Centre2Value":{"X":${等待点2.posX},"Y":0,"Z":${等待点2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":9}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${等待点2.posX},"Y":0,"Z":${等待点2.posY}}`;
          }
          postAoe(`{"Name":"P5二运扇形站位外1","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近buff.posX},"Y":0,"Z":${近buff.posY}},"Radius":0.3,"Color":1073807104,"Delay":9,"During":${dur}}`);
          postAoe(`{"Name":"P5二运扇形站位连线外1","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[1]},"Centre2Type":"PostionValue","Centre2Value":{"X":${近buff.posX},"Y":0,"Z":${近buff.posY}},"Thikness":10,"Color":4278255360,"Delay":9,"During":${dur}}`);
        }
        if (finishSort[2]==data.myId || debugMode) {
          postAoe(`{"Name":"P5二运尾巴安全点","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${等待点1.posX},"Y":0,"Z":${等待点1.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":9}`);
          postAoe(`{"Name":"P5二运尾巴安全点连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[2]},"Centre2Type":"PostionValue","Centre2Value":{"X":${等待点1.posX},"Y":0,"Z":${等待点1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":9}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${等待点1.posX},"Y":0,"Z":${等待点1.posY}}`;
          }
          postAoe(`{"Name":"P5二运扇形站位外2","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${手引导1.posX},"Y":0,"Z":${手引导1.posY}},"Radius":0.3,"Color":1073807104,"Delay":9,"During":${dur}}`);
          postAoe(`{"Name":"P5二运扇形站位连线外2","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[2]},"Centre2Type":"PostionValue","Centre2Value":{"X":${手引导1.posX},"Y":0,"Z":${手引导1.posY}},"Thikness":10,"Color":4278255360,"Delay":9,"During":${dur}}`);
        }
        if (finishSort[3]==data.myId || debugMode) {
          postAoe(`{"Name":"P5二运尾巴安全点","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${等待点1.posX},"Y":0,"Z":${等待点1.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":9}`);
          postAoe(`{"Name":"P5二运尾巴安全点连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[3]},"Centre2Type":"PostionValue","Centre2Value":{"X":${等待点1.posX},"Y":0,"Z":${等待点1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":9}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${等待点1.posX},"Y":0,"Z":${等待点1.posY}}`;
          }
          postAoe(`{"Name":"P5二运扇形站位外3","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${手引导2.posX},"Y":0,"Z":${手引导2.posY}},"Radius":0.3,"Color":1073807104,"Delay":9,"During":${dur}}`);
          postAoe(`{"Name":"P5二运扇形站位连线外3","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[3]},"Centre2Type":"PostionValue","Centre2Value":{"X":${手引导2.posX},"Y":0,"Z":${手引导2.posY}},"Thikness":10,"Color":4278255360,"Delay":9,"During":${dur}}`);
        }
        if (finishSort[4]==data.myId || debugMode) {
          postAoe(`{"Name":"P5二运尾巴安全点","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${等待点1.posX},"Y":0,"Z":${等待点1.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":9}`);
          postAoe(`{"Name":"P5二运尾巴安全点连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[4]},"Centre2Type":"PostionValue","Centre2Value":{"X":${等待点1.posX},"Y":0,"Z":${等待点1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":9}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${等待点1.posX},"Y":0,"Z":${等待点1.posY}}`;
          }
          postAoe(`{"Name":"P5二运扇形站位外4","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${远引导1.posX},"Y":0,"Z":${远引导1.posY}},"Radius":0.3,"Color":1073807104,"Delay":9,"During":${dur}}`);
          postAoe(`{"Name":"P5二运扇形站位连线外4","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[4]},"Centre2Type":"PostionValue","Centre2Value":{"X":${远引导1.posX},"Y":0,"Z":${远引导1.posY}},"Thikness":10,"Color":4278255360,"Delay":9,"During":${dur}}`);
        }
        if (finishSort[5]==data.myId || debugMode) {
          postAoe(`{"Name":"P5二运尾巴安全点","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${等待点2.posX},"Y":0,"Z":${等待点2.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":9}`);
          postAoe(`{"Name":"P5二运尾巴安全点连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[5]},"Centre2Type":"PostionValue","Centre2Value":{"X":${等待点2.posX},"Y":0,"Z":${等待点2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":9}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${等待点2.posX},"Y":0,"Z":${等待点2.posY}}`;
          }
          postAoe(`{"Name":"P5二运扇形站位外5","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${远引导2.posX},"Y":0,"Z":${远引导2.posY}},"Radius":0.3,"Color":1073807104,"Delay":9,"During":${dur}}`);
          postAoe(`{"Name":"P5二运扇形站位连线外5","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[5]},"Centre2Type":"PostionValue","Centre2Value":{"X":${远引导2.posX},"Y":0,"Z":${远引导2.posY}},"Thikness":10,"Color":4278255360,"Delay":9,"During":${dur}}`);
        }
        if (finishSort[6]==data.myId || debugMode) {
          postAoe(`{"Name":"P5二运尾巴安全点","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${等待点2.posX},"Y":0,"Z":${等待点2.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":9}`);
          postAoe(`{"Name":"P5二运尾巴安全点连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[6]},"Centre2Type":"PostionValue","Centre2Value":{"X":${等待点2.posX},"Y":0,"Z":${等待点2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":9}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${等待点2.posX},"Y":0,"Z":${等待点2.posY}}`;
          }
          postAoe(`{"Name":"P5二运扇形站位外6","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近引导1.posX},"Y":0,"Z":${近引导1.posY}},"Radius":0.3,"Color":1073807104,"Delay":9,"During":${dur}}`);
          postAoe(`{"Name":"P5二运扇形站位连线外6","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[6]},"Centre2Type":"PostionValue","Centre2Value":{"X":${近引导1.posX},"Y":0,"Z":${近引导1.posY}},"Thikness":10,"Color":4278255360,"Delay":9,"During":${dur}}`);
        }
        if (finishSort[7]==data.myId || debugMode) {
          postAoe(`{"Name":"P5二运尾巴安全点","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${等待点2.posX},"Y":0,"Z":${等待点2.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":9}`);
          postAoe(`{"Name":"P5二运尾巴安全点连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[7]},"Centre2Type":"PostionValue","Centre2Value":{"X":${等待点2.posX},"Y":0,"Z":${等待点2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":9}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${等待点2.posX},"Y":0,"Z":${等待点2.posY}}`;
          }
          postAoe(`{"Name":"P5二运扇形站位外7","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近引导2.posX},"Y":0,"Z":${近引导2.posY}},"Radius":0.3,"Color":1073807104,"Delay":9,"During":${dur}}`);
          postAoe(`{"Name":"P5二运扇形站位连线外7","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[7]},"Centre2Type":"PostionValue","Centre2Value":{"X":${近引导2.posX},"Y":0,"Z":${近引导2.posY}},"Thikness":10,"Color":4278255360,"Delay":9,"During":${dur}}`);
        }

      }
    },
    { id: 'TOP P5 二运尾部及女人aoe',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data) => data.阶段 === 'sigma',
      run: async (data, matches) => {
        
        let debugMode=false;
        const id = getHeadmarkerId(data, matches);
        if (id !=`009C` && id !=`009D`) return;

        let r=1;
        if(id ==`009D`) r=-1;

        postAoe(`{"Name":"TOP P5 二运尾部激光","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Length":50,"Width":12,"Rotation":0,"Color":1073807359,"Delay":0,"During":18}`);
        postAoe(`{"Name":"TOP P5 二运尾部激光","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Length":50,"Width":12,"Rotation":180,"Color":1073807359,"Delay":0,"During":18}`);
        


        let dur=2.5;
        let delay=10.5;
        let col=1073807359;
        let rr = await callOverlayHandler({
          call: 'getCombatants',
          ids: [data.P5二运男人id],
        });
        let c=rr.combatants[0];
        if (c.WeaponId === 4)
          {
            let posx1= c.PosX+Math.sin(c.Heading+Math.PI/2)*13+Math.sin(c.Heading+Math.PI)*10;
            let posy1= c.PosY+Math.cos(c.Heading+Math.PI/2)*13+Math.cos(c.Heading+Math.PI)*10;
            let posx2= c.PosX+Math.sin(c.Heading-Math.PI/2)*13+Math.sin(c.Heading+Math.PI)*10;
            let posy2= c.PosY+Math.cos(c.Heading-Math.PI/2)*13+Math.cos(c.Heading+Math.PI)*10;
            let rot= (-c.Heading/Math.PI)*180;
            postAoe(`{"Name":"TOP P5 三运女人辣翅右","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":${posx1},"Y":0,"Z":${posy1}},"Length":40,"Width":18,"Rotation":${rot},"Color":${col},"Delay":${delay},"During":${dur}}`);
            postAoe(`{"Name":"TOP P5 三运女人辣翅左","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":${posx2},"Y":0,"Z":${posy2}},"Length":40,"Width":18,"Rotation":${rot},"Color":${col},"Delay":${delay},"During":${dur}}`);
            //女人辣翅
            // postAoe(`{"Name":"P2一运女人辣翅","AoeType":"Rect","CentreType":"ActorId","CentreValue":${c.ID},"Length":40,"Width":10.0,"Rotation":0.0,"Color":1073807104,"Delay":0,"During":${dur}}`);
          }else{
            //女人十字
            postAoe(`{"Name":"TOP P5 三运女人十字1","AoeType":"Rect","CentreType":"ActorId","CentreValue":${c.ID},"Length":42,"Width":10.0,"Rotation":0.0,"Color":${col},"Delay":${delay},"During":${dur}}`);
            postAoe(`{"Name":"TOP P5 三运女人十字2","AoeType":"Rect","CentreType":"ActorId","CentreValue":${c.ID},"Length":20,"Width":10.0,"Rotation":90.0,"Color":${col},"Delay":${delay},"During":${dur}}`);
            postAoe(`{"Name":"TOP P5 三运女人十字3","AoeType":"Rect","CentreType":"ActorId","CentreValue":${c.ID},"Length":10,"Width":10.0,"Rotation":180.0,"Color":${col},"Delay":${delay},"During":${dur}}`);
            postAoe(`{"Name":"TOP P5 三运女人十字4","AoeType":"Rect","CentreType":"ActorId","CentreValue":${c.ID},"Length":20,"Width":10.0,"Rotation":270.0,"Color":${col},"Delay":${delay},"During":${dur}}`);

          }

      }
    },
    { id: 'TOP P5 三运扇形范围',
      type: 'StartsUsing',
      netRegex: { id: ['7B9B','7B9C']},
      //7B9B 南北
      //7B9C 东西
      condition: (data) => data.阶段 === 'omega',
      run: (data, matches) => {
        
        let rot=0;
        if (matches.id=='7B9C') rot=90;

        postAoe(`{"Name":"TOP P5 三运扇形范围","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":22,"Angle":120,"Rotation":${0.0+rot},"Color":2147506175,"Delay":0,"During":9}`);
        postAoe(`{"Name":"TOP P5 三运扇形范围","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":22,"Angle":120,"Rotation":${180+rot},"Color":2147506175,"Delay":0,"During":9}`);
        postAoe(`{"Name":"TOP P5 三运扇形范围二段","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":22,"Angle":120,"Rotation":${0.0+rot+90},"Color":2147506175,"Delay":9,"During":4}`);
        postAoe(`{"Name":"TOP P5 三运扇形范围二段","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":22,"Angle":120,"Rotation":${180+rot+90},"Color":2147506175,"Delay":9,"During":4}`);


      },
    },
    { id: 'TOP P5 三运男女人组合技',
      type: 'Object',
      netRegex:
        /] ChatLog 00:0:106:(?<sourceId>[^:]{8}):[^:]*:0197:0000:00001E43:/,
      condition: (data) => data.阶段 === 'omega',
      run: async (data, matches) => {
        
        let col=2147506175;

        const omegaMNPCId = 15721;
        const omegaFNPCId = 15722;


        let rr = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let c=rr.combatants[0];
        if (c.BNpcID!=omegaMNPCId && c.BNpcID!=omegaFNPCId) return;


        if (data.P5三运男人计数===undefined) data.P5三运男人计数=0;

        data.P5三运男人计数=data.P5三运男人计数%4+1;

        let dur=13;
        let delay=0;
        if (data.P5三运男人计数>2) {
          dur=4;
          delay=9;
        }

        if (c.BNpcID === omegaMNPCId) {
          
            if (c.WeaponId === 4)
            {
              //男人月环
              postAoe(`{"Name":"TOP P5 三运男人月环","AoeType":"Donut","CentreType":"ActorId","CentreValue":${c.ID},"Radius":40,"InnerRadius":10,"Color":${col},"Delay":${delay},"During":${dur}}`);
            }else{
              //男人钢铁
              postAoe(`{"Name":"TOP P5 三运男人钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":${c.ID},"Radius":10,"Color":${col},"Delay":${delay},"During":${dur}}`);
              
            }
          
        }
        if (c.BNpcID === omegaFNPCId) {
          if (c.WeaponId === 4)
          {
            let posx1= c.PosX+Math.sin(c.Heading+Math.PI/2)*13+Math.sin(c.Heading+Math.PI)*10;
            let posy1= c.PosY+Math.cos(c.Heading+Math.PI/2)*13+Math.cos(c.Heading+Math.PI)*10;
            let posx2= c.PosX+Math.sin(c.Heading-Math.PI/2)*13+Math.sin(c.Heading+Math.PI)*10;
            let posy2= c.PosY+Math.cos(c.Heading-Math.PI/2)*13+Math.cos(c.Heading+Math.PI)*10;
            let rot= (-c.Heading/Math.PI)*180;
            postAoe(`{"Name":"TOP P5 三运女人辣翅右","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":${posx1},"Y":0,"Z":${posy1}},"Length":40,"Width":18,"Rotation":${rot},"Color":${col},"Delay":${delay},"During":${dur}}`);
            postAoe(`{"Name":"TOP P5 三运女人辣翅左","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":${posx2},"Y":0,"Z":${posy2}},"Length":40,"Width":18,"Rotation":${rot},"Color":${col},"Delay":${delay},"During":${dur}}`);
            //女人辣翅
            // postAoe(`{"Name":"P2一运女人辣翅","AoeType":"Rect","CentreType":"ActorId","CentreValue":${c.ID},"Length":40,"Width":10.0,"Rotation":0.0,"Color":1073807104,"Delay":0,"During":${dur}}`);
          }else{
            //女人十字
            postAoe(`{"Name":"TOP P5 三运女人十字1","AoeType":"Rect","CentreType":"ActorId","CentreValue":${c.ID},"Length":40,"Width":10.0,"Rotation":0.0,"Color":${col},"Delay":${delay},"During":${dur}}`);
            postAoe(`{"Name":"TOP P5 三运女人十字2","AoeType":"Rect","CentreType":"ActorId","CentreValue":${c.ID},"Length":40,"Width":10.0,"Rotation":90.0,"Color":${col},"Delay":${delay},"During":${dur}}`);
            postAoe(`{"Name":"TOP P5 三运女人十字3","AoeType":"Rect","CentreType":"ActorId","CentreValue":${c.ID},"Length":40,"Width":10.0,"Rotation":180.0,"Color":${col},"Delay":${delay},"During":${dur}}`);
            postAoe(`{"Name":"TOP P5 三运女人十字4","AoeType":"Rect","CentreType":"ActorId","CentreValue":${c.ID},"Length":40,"Width":10.0,"Rotation":270.0,"Color":${col},"Delay":${delay},"During":${dur}}`);

          }
        }


      },
    },
    { id: 'TOP P5 三运远近世界buff收集',
      type: 'GainsEffect',
      //D73远处
      //D72近处
      netRegex: { effectId: ['D73', 'D72'] },
      condition: (data) => data.阶段 === 'omega',
      run: (data, matches) => {
        let d= parseFloat(matches.duration);
        if (matches.effectId=='D73') {
          if (d>40) {
            data.P5三运远世界点名2= parseInt(matches.targetId, 16);
          }else{
            data.P5三运远世界点名1= parseInt(matches.targetId, 16);
          }
        }else{
          if (d>40) {
            data.P5三运近世界点名2= parseInt(matches.targetId, 16);
          }else{
            data.P5三运近世界点名1= parseInt(matches.targetId, 16);
          }
        }
      },
    },
    { id: 'TOP P5 三运第一次引导站位',
      type: 'StartsUsing',
      netRegex: { id: ['7B96','7B97']},
      //7B96 东
      //7B97 西
      condition: (data) => data.阶段 === 'omega',
      run: (data, matches) => {
        
        let dur=10;
        // dur =999;
        let debugMode=false;


        let finishSort=[];
        //0:锁链1
        //1:锁链2
        //2:禁止1
        //3:禁止2
        //4:攻击1
        //5:攻击2
        //6:攻击3
        //7:攻击4
        finishSort[0]=data.P5三运远世界点名1;
        finishSort[1]=data.P5三运近世界点名1;
        for (let i = 0; i < 8; i++) {//正常两层1
          let b= data.TDHParty[i];
          if (finishSort.indexOf(b)==-1 && data.P5潜能量计数器[b]==2) {
            finishSort[2]=b;
            break;
          }
        }
        for (let i = 0; i < 8; i++) {//麻将二号两层1
          let b= data.TDHParty[i];
          if ((b==data.P5三运远世界点名2 || b==data.P5三运近世界点名2) && finishSort.indexOf(b)==-1 && data.P5潜能量计数器[b]==2) {
            finishSort[2]=b;
            break;
          }
        }
        for (let i = 0; i < 8; i++) {//正常两层2
          let b= data.TDHParty[i];
          if (finishSort.indexOf(b)==-1 && data.P5潜能量计数器[b]==2) {
            finishSort[3]=b;
            break;
          }
        }
        for (let i = 0; i < 8; i++) {//麻将二号两层2
          let b= data.TDHParty[i];
          if ((b==data.P5三运远世界点名2 || b==data.P5三运近世界点名2) && finishSort.indexOf(b)==-1 && data.P5潜能量计数器[b]==2) {
            finishSort[3]=b;
            break;
          }
        }
        for (let i = 0; i < 8; i++) {
          let b= data.TDHParty[i];
          if (finishSort.indexOf(b)==-1) {
            finishSort.push(b);
          }
        }




        let r=2;
        if (matches.id=='7B97') r=-2;
        var 中心={posX:100,posY:100};
        var 波动炮引导1=RotatePointFromCentre({posX:90.8,posY:90.8},中心,45*r);
        var 波动炮引导2=RotatePointFromCentre({posX:109.2,posY:90.8},中心,45*r);

        var 近buff=RotatePointFromCentre({posX:94.74,posY:118.26},中心,45*r);
        var 近引导1=RotatePointFromCentre({posX:102,posY:111},中心,45*r);
        var 近引导2=RotatePointFromCentre({posX:105.26,posY:118.26},中心,45*r);

        var 远buff=RotatePointFromCentre({posX:90,posY:101},中心,45*r);
        var 远引导1=RotatePointFromCentre({posX:81,posY:101},中心,45*r);
        var 远引导2=RotatePointFromCentre({posX:119,posY:101},中心,45*r);

        data.moveBuffer=undefined;
        data.moveBuffer2=undefined;

        if (finishSort[0]==data.myId || debugMode) {
          postAoe(`{"Name":"P5三运远buff站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${远buff.posX},"Y":0,"Z":${远buff.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5三运远buff站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[0]},"Centre2Type":"PostionValue","Centre2Value":{"X":${远buff.posX},"Y":0,"Z":${远buff.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${远buff.posX},"Y":0,"Z":${远buff.posY}}`;
          }
        }
        if (finishSort[1]==data.myId || debugMode) {
          postAoe(`{"Name":"P5三运近buff站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近buff.posX},"Y":0,"Z":${近buff.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5三运近buff站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[1]},"Centre2Type":"PostionValue","Centre2Value":{"X":${近buff.posX},"Y":0,"Z":${近buff.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${近buff.posX},"Y":0,"Z":${近buff.posY}}`;
          }
        }
        if (finishSort[2]==data.myId || debugMode) {
          postAoe(`{"Name":"P5三运波动炮引导1站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${波动炮引导1.posX},"Y":0,"Z":${波动炮引导1.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5三运波动炮引导1站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[2]},"Centre2Type":"PostionValue","Centre2Value":{"X":${波动炮引导1.posX},"Y":0,"Z":${波动炮引导1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${波动炮引导1.posX},"Y":0,"Z":${波动炮引导1.posY}}`;
          }
        }
        if (finishSort[3]==data.myId || debugMode) {
          postAoe(`{"Name":"P5三运波动炮引导2站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${波动炮引导2.posX},"Y":0,"Z":${波动炮引导2.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5三运波动炮引导2站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[3]},"Centre2Type":"PostionValue","Centre2Value":{"X":${波动炮引导2.posX},"Y":0,"Z":${波动炮引导2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${波动炮引导2.posX},"Y":0,"Z":${波动炮引导2.posY}}`;
          }
        }
        if (finishSort[4]==data.myId || debugMode) {
          postAoe(`{"Name":"P5三运远世界引导1站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${远引导1.posX},"Y":0,"Z":${远引导1.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5三运远世界引导1站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[4]},"Centre2Type":"PostionValue","Centre2Value":{"X":${远引导1.posX},"Y":0,"Z":${远引导1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${远引导1.posX},"Y":0,"Z":${远引导1.posY}}`;
          }
        }
        if (finishSort[5]==data.myId || debugMode) {
          postAoe(`{"Name":"P5三运远世界引导1站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${远引导2.posX},"Y":0,"Z":${远引导2.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5三运远世界引导1站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[5]},"Centre2Type":"PostionValue","Centre2Value":{"X":${远引导2.posX},"Y":0,"Z":${远引导2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${远引导2.posX},"Y":0,"Z":${远引导2.posY}}`;
          }
        }
        if (finishSort[6]==data.myId || debugMode) {
          postAoe(`{"Name":"P5三运近世界引导1站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近引导1.posX},"Y":0,"Z":${近引导1.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5三运近世界引导1站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[6]},"Centre2Type":"PostionValue","Centre2Value":{"X":${近引导1.posX},"Y":0,"Z":${近引导1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${近引导1.posX},"Y":0,"Z":${近引导1.posY}}`;
          }
        }
        if (finishSort[7]==data.myId || debugMode) {
          postAoe(`{"Name":"P5三运近世界引导2站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近引导2.posX},"Y":0,"Z":${近引导2.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5三运近世界引导2站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[7]},"Centre2Type":"PostionValue","Centre2Value":{"X":${近引导2.posX},"Y":0,"Z":${近引导2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${近引导2.posX},"Y":0,"Z":${近引导2.posY}}`;
          }
        }
      },
    },
    { id: 'TOP P5 三运读条清除标记',
      type: 'StartsUsing',
      netRegex: { id: '8015'},
      run: (data, matches) => {
        if (data.triggerSetConfig.P5_3Marker) {
          PostNamazuMarkClear();
        }
      },
    },
    { id: 'TOP P5 三运第一次标记',
      type: 'Ability',
      netRegex: { id: ['7B9B','7B9C']},
      condition: (data) => data.阶段 === 'omega',
      run: (data, matches) => {
        let finishSort=[];
        //0:锁链1
        //1:锁链2
        //2:禁止1
        //3:禁止2
        //4:攻击1
        //5:攻击2
        //6:攻击3
        //7:攻击4
        finishSort[0]=data.P5三运远世界点名1;
        finishSort[1]=data.P5三运近世界点名1;
        for (let i = 0; i < 8; i++) {//正常两层1
          let b= data.TDHParty[i];
          if (finishSort.indexOf(b)==-1 && data.P5潜能量计数器[b]==2) {
            finishSort[2]=b;
            break;
          }
        }
        for (let i = 0; i < 8; i++) {//麻将二号两层1
          let b= data.TDHParty[i];
          if ((b==data.P5三运远世界点名2 || b==data.P5三运近世界点名2) && finishSort.indexOf(b)==-1 && data.P5潜能量计数器[b]==2) {
            finishSort[2]=b;
            break;
          }
        }
        for (let i = 0; i < 8; i++) {//正常两层2
          let b= data.TDHParty[i];
          if (finishSort.indexOf(b)==-1 && data.P5潜能量计数器[b]==2) {
            finishSort[3]=b;
            break;
          }
        }
        for (let i = 0; i < 8; i++) {//麻将二号两层2
          let b= data.TDHParty[i];
          if ((b==data.P5三运远世界点名2 || b==data.P5三运近世界点名2) && finishSort.indexOf(b)==-1 && data.P5潜能量计数器[b]==2) {
            finishSort[3]=b;
            break;
          }
        }
        for (let i = 0; i < 8; i++) {
          let b= data.TDHParty[i];
          if (finishSort.indexOf(b)==-1) {
            finishSort.push(b);
          }
        }


        if (data.triggerSetConfig.P5_3Marker) {
          //0:锁链1
          //1:锁链2
          //2:禁止1
          //3:禁止2
          //4:攻击1
          //5:攻击2
          //6:攻击3
          //7:攻击4
          sendMark({ ActorID: finishSort[0], MarkType: 'bind1', LocalOnly: false, });
          sendMark({ ActorID: finishSort[1], MarkType: 'bind2', LocalOnly: false, });
          sendMark({ ActorID: finishSort[2], MarkType: 'stop1', LocalOnly: false, });
          sendMark({ ActorID: finishSort[3], MarkType: 'stop2', LocalOnly: false, });
          sendMark({ ActorID: finishSort[4], MarkType: 'attack1', LocalOnly: false, });
          sendMark({ ActorID: finishSort[5], MarkType: 'attack2', LocalOnly: false, });
          sendMark({ ActorID: finishSort[6], MarkType: 'attack3', LocalOnly: false, });
          sendMark({ ActorID: finishSort[7], MarkType: 'attack4', LocalOnly: false, });
        }
      },
    },
    { id: 'TOP P5 三运第一次引导清除标记',
      type: 'Ability',
      netRegex: { id: ['7B96','7B97']},
      condition: (data) => data.阶段 === 'omega',
      run: (data, matches) => {
        if (data.triggerSetConfig.P5_3Marker) {
          PostNamazuMarkClear();
        }
      },
    },
    { id: 'TOP P5 三运第二次引导站位及标记',
      type: 'Object',
      netRegex:
        /] ChatLog 00:0:106:(?<sourceId>[^:]{8}):[^:]*:0197:0000:00001E43:/,
      condition: (data) => data.阶段 === 'omega',
      delaySeconds:2.5,
      run: async (data, matches) => {
        
        let dur=17.5;
        // dur=999;
        let debugMode=false;

        const omegaMNPCId = 15721;
        const omegaFNPCId = 15722;


        let rr = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let c=rr.combatants[0];
        if (c.BNpcID!=15724) return;


        let finishSort=[];
        //0:锁链1
        //1:锁链2
        //2:禁止1
        //3:禁止2
        //4:攻击1
        //5:攻击2
        //6:攻击3
        //7:攻击4
        finishSort[0]=data.P5三运远世界点名2;
        finishSort[1]=data.P5三运近世界点名2;
        for (let i = 0; i < 8; i++) {
          let b= data.TDHParty[i];
          if (finishSort.indexOf(b)==-1 && data.P5潜能量计数器[b]==3) {
            finishSort[2]=b;
            break;
          }
        }
        for (let i = 0; i < 8; i++) {
          let b= data.TDHParty[i];
          if (finishSort.indexOf(b)==-1 && data.P5潜能量计数器[b]==3) {
            finishSort[3]=b;
            break;
          }
        }
        for (let i = 0; i < 8; i++) {
          let b= data.TDHParty[i];
          if (finishSort.indexOf(b)==-1) {
            finishSort.push(b);
          }
        }

        if (data.triggerSetConfig.P5_3Marker) {
          //0:锁链1
          //1:锁链2
          //2:禁止1
          //3:禁止2
          //4:攻击1
          //5:攻击2
          //6:攻击3
          //7:攻击4
          sendMark({ ActorID: finishSort[0], MarkType: 'bind1', LocalOnly: false, });
          sendMark({ ActorID: finishSort[1], MarkType: 'bind2', LocalOnly: false, });
          sendMark({ ActorID: finishSort[2], MarkType: 'stop1', LocalOnly: false, });
          sendMark({ ActorID: finishSort[3], MarkType: 'stop2', LocalOnly: false, });
          sendMark({ ActorID: finishSort[4], MarkType: 'attack1', LocalOnly: false, });
          sendMark({ ActorID: finishSort[5], MarkType: 'attack2', LocalOnly: false, });
          sendMark({ ActorID: finishSort[6], MarkType: 'attack3', LocalOnly: false, });
          sendMark({ ActorID: finishSort[7], MarkType: 'attack4', LocalOnly: false, });
        }



        let r = Math.round(
          Math.round(4 - (4 * Math.atan2(c.PosX - 100, c.PosY - 100)) / Math.PI) % 8
        );
        var 中心={posX:100,posY:100};
        var 冲击波引导1=RotatePointFromCentre({posX:89.7,posY:83.5},中心,45*r);
        var 冲击波引导2=RotatePointFromCentre({posX:110.3,posY:83.5},中心,45*r);

        var 近buff=RotatePointFromCentre({posX:94.74,posY:118.26},中心,45*r);
        var 近引导1=RotatePointFromCentre({posX:102,posY:111},中心,45*r);
        var 近引导2=RotatePointFromCentre({posX:105.26,posY:118.26},中心,45*r);

        var 远buff=RotatePointFromCentre({posX:90,posY:101},中心,45*r);
        var 远引导1=RotatePointFromCentre({posX:81,posY:101},中心,45*r);
        var 远引导2=RotatePointFromCentre({posX:119,posY:101},中心,45*r);
        data.moveBuffer=undefined;
        data.moveBuffer2=undefined;

        if (finishSort[0]==data.myId || debugMode) {
          postAoe(`{"Name":"P5三运远buff站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${远buff.posX},"Y":0,"Z":${远buff.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5三运远buff站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[0]},"Centre2Type":"PostionValue","Centre2Value":{"X":${远buff.posX},"Y":0,"Z":${远buff.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${远buff.posX},"Y":0,"Z":${远buff.posY}}`;
          }
        }
        if (finishSort[1]==data.myId || debugMode) {
          postAoe(`{"Name":"P5三运近buff站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近buff.posX},"Y":0,"Z":${近buff.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5三运近buff站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[1]},"Centre2Type":"PostionValue","Centre2Value":{"X":${近buff.posX},"Y":0,"Z":${近buff.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${近buff.posX},"Y":0,"Z":${近buff.posY}}`;
          }
        }
        if (finishSort[2]==data.myId || debugMode) {
          postAoe(`{"Name":"P5三运波动炮引导1站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${冲击波引导1.posX},"Y":0,"Z":${冲击波引导1.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5三运波动炮引导1站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[2]},"Centre2Type":"PostionValue","Centre2Value":{"X":${冲击波引导1.posX},"Y":0,"Z":${冲击波引导1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${冲击波引导1.posX},"Y":0,"Z":${冲击波引导1.posY}}`;
          }
        }
        if (finishSort[3]==data.myId || debugMode) {
          postAoe(`{"Name":"P5三运波动炮引导2站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${冲击波引导2.posX},"Y":0,"Z":${冲击波引导2.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5三运波动炮引导2站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[3]},"Centre2Type":"PostionValue","Centre2Value":{"X":${冲击波引导2.posX},"Y":0,"Z":${冲击波引导2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${冲击波引导2.posX},"Y":0,"Z":${冲击波引导2.posY}}`;
          }
        }
        if (finishSort[4]==data.myId || debugMode) {
          postAoe(`{"Name":"P5三运远世界引导1站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${远引导1.posX},"Y":0,"Z":${远引导1.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5三运远世界引导1站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[4]},"Centre2Type":"PostionValue","Centre2Value":{"X":${远引导1.posX},"Y":0,"Z":${远引导1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${远引导1.posX},"Y":0,"Z":${远引导1.posY}}`;
          }
        }
        if (finishSort[5]==data.myId || debugMode) {
          postAoe(`{"Name":"P5三运远世界引导1站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${远引导2.posX},"Y":0,"Z":${远引导2.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5三运远世界引导1站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[5]},"Centre2Type":"PostionValue","Centre2Value":{"X":${远引导2.posX},"Y":0,"Z":${远引导2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${远引导2.posX},"Y":0,"Z":${远引导2.posY}}`;
          }
        }
        if (finishSort[6]==data.myId || debugMode) {
          postAoe(`{"Name":"P5三运近世界引导1站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近引导1.posX},"Y":0,"Z":${近引导1.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5三运近世界引导1站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[6]},"Centre2Type":"PostionValue","Centre2Value":{"X":${近引导1.posX},"Y":0,"Z":${近引导1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${近引导1.posX},"Y":0,"Z":${近引导1.posY}}`;
          }
        }
        if (finishSort[7]==data.myId || debugMode) {
          postAoe(`{"Name":"P5三运近世界引导2站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${近引导2.posX},"Y":0,"Z":${近引导2.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P5三运近世界引导2站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${finishSort[7]},"Centre2Type":"PostionValue","Centre2Value":{"X":${近引导2.posX},"Y":0,"Z":${近引导2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          if(!debugMode)
          {
            data.moveBuffer = `{"X":${近引导2.posX},"Y":0,"Z":${近引导2.posY}}`;
          }
        }


      },
    },
    { id: 'TOP P6 射手天箭范围',
      type: 'StartsUsing',
      netRegex: { id: '7BA3'},
      suppressSeconds:1,
      run: async (data, matches) => {
        // let cor=1073807359;
        let cor=2147506175;


        let rr = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(matches.sourceId, 16)],
        });
        let result=rr.combatants[0];
        if (Math.abs(parseFloat(result.PosX)-100)<1 || Math.abs(parseFloat(result.PosY)-100)<1) {
          postAoe(`{"Name":"TOP P6 中心射手天箭范围","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":80},"Length":40,"Width":10,"Rotation":0.0,"Color":${cor},"Delay":0,"During":8}`);
          postAoe(`{"Name":"TOP P6 中心射手天箭范围","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":80,"Y":0,"Z":100},"Length":40,"Width":10,"Rotation":-90.0,"Color":${cor},"Delay":0,"During":8}`);
          postAoe(`{"Name":"TOP P6 中心射手天箭范围2","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":107.5,"Y":0,"Z":80},"Length":40,"Width":5,"Rotation":0.0,"Color":${cor},"Delay":8,"During":2}`);
          postAoe(`{"Name":"TOP P6 中心射手天箭范围2","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":92.5,"Y":0,"Z":80},"Length":40,"Width":5,"Rotation":0.0,"Color":${cor},"Delay":8,"During":2}`);
          postAoe(`{"Name":"TOP P6 中心射手天箭范围2","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":80,"Y":0,"Z":107.5},"Length":40,"Width":5,"Rotation":-90.0,"Color":${cor},"Delay":8,"During":2}`);
          postAoe(`{"Name":"TOP P6 中心射手天箭范围2","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":80,"Y":0,"Z":92.5},"Length":40,"Width":5,"Rotation":-90.0,"Color":${cor},"Delay":8,"During":2}`);
          postAoe(`{"Name":"TOP P6 中心射手天箭范围3","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":112.5,"Y":0,"Z":80},"Length":40,"Width":5,"Rotation":0.0,"Color":${cor},"Delay":10,"During":2}`);
          postAoe(`{"Name":"TOP P6 中心射手天箭范围3","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":87.5,"Y":0,"Z":80},"Length":40,"Width":5,"Rotation":0.0,"Color":${cor},"Delay":10,"During":2}`);
          postAoe(`{"Name":"TOP P6 中心射手天箭范围3","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":80,"Y":0,"Z":112.5},"Length":40,"Width":5,"Rotation":-90.0,"Color":${cor},"Delay":10,"During":2}`);
          postAoe(`{"Name":"TOP P6 中心射手天箭范围3","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":80,"Y":0,"Z":87.5},"Length":40,"Width":5,"Rotation":-90.0,"Color":${cor},"Delay":10,"During":2}`);
          postAoe(`{"Name":"TOP P6 中心射手天箭范围4","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":117.5,"Y":0,"Z":80},"Length":40,"Width":5,"Rotation":0.0,"Color":${cor},"Delay":12,"During":2}`);
          postAoe(`{"Name":"TOP P6 中心射手天箭范围4","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":82.5,"Y":0,"Z":80},"Length":40,"Width":5,"Rotation":0.0,"Color":${cor},"Delay":12,"During":2}`);
          postAoe(`{"Name":"TOP P6 中心射手天箭范围4","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":80,"Y":0,"Z":117.5},"Length":40,"Width":5,"Rotation":-90.0,"Color":${cor},"Delay":12,"During":2}`);
          postAoe(`{"Name":"TOP P6 中心射手天箭范围4","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":80,"Y":0,"Z":82.5},"Length":40,"Width":5,"Rotation":-90.0,"Color":${cor},"Delay":12,"During":2}`);
        
        }else
        {
          postAoe(`{"Name":"TOP P6 外侧射手天箭范围","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":80,"Y":0,"Z":85},"Length":40,"Width":10,"Rotation":-90.0,"Color":${cor},"Delay":0,"During":8}`);
          postAoe(`{"Name":"TOP P6 外侧射手天箭范围","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":80,"Y":0,"Z":115},"Length":40,"Width":10,"Rotation":-90.0,"Color":${cor},"Delay":0,"During":8}`);
          postAoe(`{"Name":"TOP P6 外侧射手天箭范围","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":85,"Y":0,"Z":80},"Length":40,"Width":10,"Rotation":0.0,"Color":${cor},"Delay":0,"During":8}`);
          postAoe(`{"Name":"TOP P6 外侧射手天箭范围","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":115,"Y":0,"Z":80},"Length":40,"Width":10,"Rotation":0.0,"Color":${cor},"Delay":0,"During":8}`);
          for (let i = 1; i < 7; i++) {
            postAoe(`{"Name":"TOP P6 外侧射手天箭范围${i}","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":80,"Y":0,"Z":${87.5+i*5}},"Length":40,"Width":5,"Rotation":-90.0,"Color":${cor},"Delay":${6+i*2},"During":2}`);
            postAoe(`{"Name":"TOP P6 外侧射手天箭范围${i}","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":80,"Y":0,"Z":${112.5-i*5}},"Length":40,"Width":5,"Rotation":-90.0,"Color":${cor},"Delay":${6+i*2},"During":2}`);
            postAoe(`{"Name":"TOP P6 外侧射手天箭范围${i}","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":${87.5+i*5},"Y":0,"Z":80},"Length":40,"Width":5,"Rotation":0.0,"Color":${cor},"Delay":${6+i*2},"During":2}`);
            postAoe(`{"Name":"TOP P6 外侧射手天箭范围${i}","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":${112.5-i*5},"Y":0,"Z":80},"Length":40,"Width":5,"Rotation":0.0,"Color":${cor},"Delay":${6+i*2},"During":2}`);
          }

        }

      },
    },
    { id: 'TOP P6 陨石点名连线',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data) => data.阶段 === 'p6',
      run: (data, matches) => {
        const id = getHeadmarkerId(data, matches);
        if (id !== '015A') return;
        if (data.P6陨石点名 === undefined) data.P6陨石点名 = [];
        data.P6陨石点名.push(parseInt(matches.targetId, 16));
        if (data.P6陨石点名.length!=3) return; 

        let dur=8;
        let d3=true;
        if(data.P6陨石点名.indexOf(data.TDHParty[6])==-1) d3=false;

        data.moveBuffer=undefined;
        data.moveBuffer2=undefined;

        if (data.P6陨石点名.indexOf(data.myId)!==-1) {
          postAoe(`{"Name":"P6陨石陨石站位1_陨石/d3陨石","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":115.5,"Y":0,"Z":100},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P6陨石陨石站位2_陨石/d3陨石","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":84.5,"Y":0,"Z":100},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          if (d3) {
            postAoe(`{"Name":"P6陨石陨石站位1_陨石/d3陨石","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":84.5},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          }else{
            postAoe(`{"Name":"P6陨石陨石站位1_陨石/d3陨石","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":115.5},"Radius":0.5,"Color":1073807104,"Delay":0,"During":${dur}}`);
          }
          postAoe(`{"Name":"P6陨石陨石点名连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P6陨石点名[0]},"Centre2Type":"ActorId","Centre2Value":${data.P6陨石点名[1]},"Thikness":10,"Color":4278255615,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P6陨石陨石点名连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.P6陨石点名[0]},"Centre2Type":"ActorId","Centre2Value":${data.P6陨石点名[2]},"Thikness":10,"Color":4278255615,"Delay":0,"During":${dur}}`);
        }




        if (data.P6陨石点名.indexOf(data.myId)==-1 && d3) {
          postAoe(`{"Name":"P6陨石点名站位_分摊/d3陨石","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":115.8},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P6陨石点名站位连线_分摊/d3陨石","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":100,"Y":0,"Z":115.8},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          data.moveBuffer = `{"X":100,"Y":0,"Z":114.8}`;
        }
        if (data.P6陨石点名.indexOf(data.myId)==-1 && !d3) {
          postAoe(`{"Name":"P6陨石点名站位_分摊/d3陨石","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":100,"Y":0,"Z":84.2},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P6陨石点名站位连线_分摊/d3陨石","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":100,"Y":0,"Z":84.2},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
          data.moveBuffer = `{"X":100,"Y":0,"Z":85.2}`;
        }
        
      },
      
    },
    { id: 'TOP P6 平A范围',
      type: 'Ability',
      netRegex: { id: ['7BA1','7BA7','7BAA'] },
      suppressSeconds: 3,
      run: async (data, matches) => {
        if (matches.id=='7BA1') data.p6BossId=matches.sourceId;
        let rr = await callOverlayHandler({
          call: 'getCombatants',
          ids: [parseInt(data.p6BossId, 16)],
        });
        let tid=rr.combatants[0].TargetID;
        // let tid=rr.combatants[0].NPCTargetID
        let dur=8;
        if (matches.id=='7BA7') dur=11;
        postAoe(`{"Name":"TOP P6一仇平A","AoeType":"Circle","CentreType":"ActorId","CentreValue":${tid},"Radius":5.0,"Color":1073807359,"Delay":0,"During":${dur}}`);
        postAoe(`{"Name":"TOP P6最远平A","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${data.p6BossId},"TrackType":"Farest","TrackValue":1,"Radius":5.0,"Color":1073807359,"Delay":0,"During":${dur}}`)
      },
    },
    { id: 'TOP P6 俯冲范围',
      type: 'StartsUsing',
      netRegex: { id: ['7BA6']},
      run: async (data, matches) => {
        postAoe(`{"Name":"TOP P6 宇宙龙炎范围","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${data.p6BossId},"TrackType":"Nearest","TrackValue":2,"Radius":8.0,"Color":1073807359,"Delay":5,"During":3}`)
      },
    },
    { id: 'TOP P6 八方波动炮位置',
      type: 'StartsUsing',
      netRegex: { id: ['7BA9'] },
      run: async (data, matches) => {
        var debugMode = false;
        var dur = 10;
        if (debugMode) dur = 999;


        var 中心 = { posX: 100, posY: 100 };
        var PA = RotatePointFromCentre({ posX: 100, posY: 90 }, 中心, 45 * 0);
        var P1 = RotatePointFromCentre({ posX: 100, posY: 90 }, 中心, 45 * 1);
        var PB = RotatePointFromCentre({ posX: 100, posY: 90 }, 中心, 45 * 2);
        var P2 = RotatePointFromCentre({ posX: 100, posY: 90 }, 中心, 45 * 3);
        var PC = RotatePointFromCentre({ posX: 100, posY: 90 }, 中心, 45 * 4);
        var P3 = RotatePointFromCentre({ posX: 100, posY: 90 }, 中心, 45 * 5);
        var PD = RotatePointFromCentre({ posX: 100, posY: 90 }, 中心, 45 * 6);
        var P4 = RotatePointFromCentre({ posX: 100, posY: 90 }, 中心, 45 * 7);
        if (data.TDHParty[0] == data.myId || debugMode) {
          postAoe(`{"Name":"P6波动炮站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${PA.posX},"Y":0,"Z":${PA.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P6波动炮站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.TDHParty[0]},"Centre2Type":"PostionValue","Centre2Value":{"X":${PA.posX},"Y":0,"Z":${PA.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
        }
        if (data.TDHParty[1] == data.myId || debugMode) {
          postAoe(`{"Name":"P6波动炮站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${PB.posX},"Y":0,"Z":${PB.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P6波动炮站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.TDHParty[1]},"Centre2Type":"PostionValue","Centre2Value":{"X":${PB.posX},"Y":0,"Z":${PB.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
        }
        if (data.TDHParty[2] == data.myId || debugMode) {
          postAoe(`{"Name":"P6波动炮站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${PD.posX},"Y":0,"Z":${PD.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P6波动炮站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.TDHParty[2]},"Centre2Type":"PostionValue","Centre2Value":{"X":${PD.posX},"Y":0,"Z":${PD.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
        }
        if (data.TDHParty[3] == data.myId || debugMode) {
          postAoe(`{"Name":"P6波动炮站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${PC.posX},"Y":0,"Z":${PC.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P6波动炮站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.TDHParty[3]},"Centre2Type":"PostionValue","Centre2Value":{"X":${PC.posX},"Y":0,"Z":${PC.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
        }
        if (data.TDHParty[4] == data.myId || debugMode) {
          postAoe(`{"Name":"P6波动炮站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${P3.posX},"Y":0,"Z":${P3.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P6波动炮站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.TDHParty[4]},"Centre2Type":"PostionValue","Centre2Value":{"X":${P3.posX},"Y":0,"Z":${P3.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
        }
        if (data.TDHParty[5] == data.myId || debugMode) {
          postAoe(`{"Name":"P6波动炮站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${P2.posX},"Y":0,"Z":${P2.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P6波动炮站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.TDHParty[5]},"Centre2Type":"PostionValue","Centre2Value":{"X":${P2.posX},"Y":0,"Z":${P2.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
        }
        if (data.TDHParty[6] == data.myId || debugMode) {
          postAoe(`{"Name":"P6波动炮站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${P4.posX},"Y":0,"Z":${P4.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P6波动炮站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.TDHParty[6]},"Centre2Type":"PostionValue","Centre2Value":{"X":${P4.posX},"Y":0,"Z":${P4.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
        }
        if (data.TDHParty[7] == data.myId || debugMode) {
          postAoe(`{"Name":"P6波动炮站位","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${P1.posX},"Y":0,"Z":${P1.posY}},"Radius":0.3,"Color":1073807104,"Delay":0,"During":${dur}}`);
          postAoe(`{"Name":"P6波动炮站位连线","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.TDHParty[7]},"Centre2Type":"PostionValue","Centre2Value":{"X":${P1.posX},"Y":0,"Z":${P1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":${dur}}`);
        }
      },
    },
    { id: 'TOP P6地火起跑位置',
      type: 'StartsUsing',
      netRegex: { id: '7BAD'},
      run: async (data, matches) => {
        if (data.P6地火收集 === undefined) data.P6地火收集 = [];
        if (data.P6地火收集.length === 4) data.P6地火收集 = [];
        data.P6地火收集.push(parseInt(matches.sourceId, 16));

        if (data.P6地火收集.length !== 2) return;

        let result1 = await callOverlayHandler({
          call: 'getCombatants',
          ids: [data.P6地火收集[0]],
        });
        let result2 = await callOverlayHandler({
          call: 'getCombatants',
          ids: [data.P6地火收集[1]],
        });
        let c1 = result1.combatants[0];
        let c2 = result2.combatants[0];

        let a = (Math.atan2(c1.PosX - 100, c1.PosY - 100) - Math.atan2(c2.PosX - 100, c2.PosY - 100)) / Math.PI * 180;
        if (a>180) a=a-360;
        if (a<-180) a=a+360;
        let end = RotatePointFromCentre({ posX: (c1.PosX - 100) / 24 * 18 + 100, posY: (c1.PosY - 100) / 24 * 18 + 100 }, { posX: 100, posY: 100 }, a*-1.5);
        let a1 = RotatePointFromCentre({ posX: (c1.PosX - 100) / 24 * 18 + 100, posY: (c1.PosY - 100) / 24 * 18 + 100 }, { posX: 100, posY: 100 }, a*-1);
        let a2 = { posX: (a1.posX - end.posX) *1.4 +end.posX, posY: (a1.posY - end.posY) *1.4 +end.posY };
        let a3 = RotatePointFromCentre(a2, a1, 150);
        let a4 = RotatePointFromCentre(a2, a1, -150);
        postAoe(`{"Name":"TOP P6地火起跑位置","AoeType":"Link","CentreType":"ActorId","CentreValue":${data.myId},"Centre2Type":"PostionValue","Centre2Value":{"X":${end.posX},"Y":0,"Z":${end.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":13}`);
        postAoe(`{"Name":"TOP P6地火跑动方向1","AoeType":"Link","CentreType":"PostionValue","CentreValue":{"X":${end.posX},"Y":0,"Z":${end.posY}},"Centre2Type":"PostionValue","Centre2Value":{"X":${a1.posX},"Y":0,"Z":${a1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":15}`);
        postAoe(`{"Name":"TOP P6地火跑动方向2","AoeType":"Link","CentreType":"PostionValue","CentreValue":{"X":${a3.posX},"Y":0,"Z":${a3.posY}},"Centre2Type":"PostionValue","Centre2Value":{"X":${a1.posX},"Y":0,"Z":${a1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":15}`);
        postAoe(`{"Name":"TOP P6地火跑动方向3","AoeType":"Link","CentreType":"PostionValue","CentreValue":{"X":${a4.posX},"Y":0,"Z":${a4.posY}},"Centre2Type":"PostionValue","Centre2Value":{"X":${a1.posX},"Y":0,"Z":${a1.posY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":15}`);


        let r=-45;
        let dis=7;
        if (data.TDHParty[1] == data.myId)
        {
          r=45;
          dis=14;
        } 
        let p = RotatePointFromCentre({ posX:100- (c2.PosX - 100) / 24 * 7, posY:100- (c2.PosY - 100) / 24 * 7 }, { posX: 100, posY: 100 }, r);
        let p2 = RotatePointFromCentre({ posX:100- (c2.PosX - 100) / 24 * dis, posY:100- (c2.PosY - 100) / 24 * dis }, { posX: 100, posY: 100 }, r);
        data.moveBuffer = `{"X":${p.posX},"Y":0,"Z":${p.posY}}`;
        data.moveBuffer2 = `{"X":${p2.posX},"Y":0,"Z":${p2.posY}}`;
      },
    },
    { id: 'TOP P6 地火起跑提示',
      type: 'StartsUsing',
      netRegex: { id: '7BAF'},
      suppressSeconds: 20,
      alertText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          cn: '走走走',
        },
      },
    },
  ],
  
});
