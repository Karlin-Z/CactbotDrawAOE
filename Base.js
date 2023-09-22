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

Options.Triggers.push({
  id: 'Karlin_PPex_DrawBase',
  zoneId: ZoneId.MatchAll,
  zoneLabel: { en: "通用设置" },
  config: [
    {
      id: "PPex_DrawBase_AoeSendMode",
      name: { en: "Aoe发送方式" },
      type: "select",
      options: { en: { "网络": "Http", "管道": "Pipe" } },
      default: "Http",
    },
    {
      id: "DangerAoeCol",
      name: { en: "危险Aoe颜色" },
      type: "integer",
      default: 1073807359,
    },
    {
      id: "SafeAoeCol",
      name: { en: "分摊Aoe颜色" },
      type: "integer",
      default: 1073807104,
    },
    {
      id: "PPex_DrawBase_ChangePlayer",
      name: { en: "以下列职业角色触发触发器" },
      type: "checkbox",
      default: false,
    },
    {
      id: "PPex_DrawBase_TriggerJob",
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
    setTimeout(() => {
      fetch(`http://127.0.0.1:${aoeport}/GetData`, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: "Team"
      });
    }, 1000);
    return {
    };
  },
  triggers: [
    
    {
      id: 'P9S PPex_DrawBase 初始化',
      regex: /Debug FB:PartyInfosList:(?<Str>.*):End/,
      suppressSeconds: 1,
      run: async (data, matches) => {
        if (data.triggerSetConfig.AoeSendMode === 'Http')
          pipeAoe = false;
        if (data.triggerSetConfig.AoeSendMode === 'Pipe')
          pipeAoe = true;




        let pInfo=JSON.parse(matches.Str);
        data.PartyInfos = pInfo;
        data.PartyIds=[];
        data.PartyIds.push(pInfo[0].Id);
        data.PartyIds.push(pInfo[1].Id);
        data.PartyIds.push(pInfo[2].Id);
        data.PartyIds.push(pInfo[3].Id);
        data.PartyIds.push(pInfo[4].Id);
        data.PartyIds.push(pInfo[5].Id);
        data.PartyIds.push(pInfo[6].Id);
        data.PartyIds.push(pInfo[7].Id);


        if (data.triggerSetConfig.PPex_DrawBase_ChangePlayer) {
          let m = data.PartyInfos.find((v) => v.JobAbbr === data.triggerSetConfig.PPex_DrawBase_TriggerJob);
          if (m !== undefined) {
            data.me = m.Name;
            data.myId = m.Id;
            let Role = {
              1: 'tank',
              2: 'dps',
              3: 'dps',
              4: 'healer',
            };
            data.job = m.JobAbbr;
            data.role = Role[m.Role];
          }
        }
        if (data.myId ===undefined) {
          data.myId=data.PartyInfos.find((v) => v.Name === data.me).Id;
        }
        // console.log(data.myId.toString(16));
      },
    },
    
    
    
  ],
  
});
