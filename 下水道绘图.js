
const 小怪钢铁 = true;
const 小怪左右刀 = true;
const 电气除尘范围 = true;
const 冰凉除尘范围 = true;
const 风清除尘范围 = true;
const 突击范围 = true;
const 火圈范围 = true;

const 鼠鼠aoe颜色 = 1090518784;
const 斗士aoe颜色 = 989921279;
const 祭祀aoe颜色 = 989921279;

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





Options.Triggers.push({
    zoneId: 1075,
    initData: () => ({
        绳次数: 0,
        boos3parse: 0,
        不安全地板: {},
    }),
    triggers: [
        {
            id: '小怪 巨木龙卷',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '7957' }),
            run: (data, matches) => {
                if (!小怪钢铁) return;
                postAoe(`{"Name":"巨木龙卷","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":12,"Color":${鼠鼠aoe颜色},"Delay":0,"During":5}`);
            }
        },
        {
            id: '小怪 花 左右刀',
            type: 'StartsUsing',
            netRegex: { id: ['795D', '795C', '795B'] },
            run: (data, matches) => {
                if (!小怪左右刀) return;
                if (matches.id == '795C') {
                    postAoe(`{"Name":"小怪 花 右刀","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":30,"Angle":180,"Rotation":135,"Color":${鼠鼠aoe颜色},"Delay":0,"During":4}`);
                }
                else if (matches.id == '795B') {
                    postAoe(`{"Name":"小怪 花 左刀","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":30,"Angle":180,"Rotation":-135,"Color":${鼠鼠aoe颜色},"Delay":0,"During":4}`);
                } else if (matches.id == '795D') {
                    postAoe(`{"Name":"小怪 花 前刀","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":30,"Angle":120,"Rotation":0,"Color":${鼠鼠aoe颜色},"Delay":0,"During":4}`);
                }
            }
        },
        {
            id: '小怪 树 左右刀',
            type: 'StartsUsing',
            netRegex: { id: ['7964', '7963', '7965'] },
            run: (data, matches) => {
                if (!小怪左右刀) return;
                if (matches.id == '7963') {
                    postAoe(`{"Name":"小怪 树 右刀","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":30,"Angle":210,"Rotation":75,"Color":${鼠鼠aoe颜色},"Delay":0,"During":4}`);
                }
                else if (matches.id == '7964') {
                    postAoe(`{"Name":"小怪 树 左刀","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":30,"Angle":210,"Rotation":-75,"Color":${鼠鼠aoe颜色},"Delay":0,"During":4}`);
                } else if (matches.id == '7965') {
                    postAoe(`{"Name":"小怪 树 前刀","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":10,"Angle":90,"Rotation":0,"Color":${鼠鼠aoe颜色},"Delay":0,"During":3}`);
                }
            }
        },
        {
            id: '小怪 无头骑士 钢铁',
            type: 'StartsUsing',
            netRegex: { id: ['7966'] },
            run: (data, matches) => {
                if (!小怪钢铁) return;
                postAoe(`{"Name":"小怪 无头骑士 钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0xE0000000,"Radius":10,"Color":${斗士aoe颜色},"Delay":0,"During":4}`);

            }
        },

        {
            id: '鼠鼠 P1擦拭',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: ['7755', '7756'] }),
            run: async (data, matches) => {
                let result = await callOverlayHandler({
                    call: 'getCombatants',
                    ids: [parseInt(matches.sourceId, 16)],
                });

                let mon = result.combatants[0];

                if (matches.id == '7755') {
                    postAoe(`{"Name":"属鼠右刀","AoeType":"Sector","CentreType":"PostionValue","CentreValue":{"X":${mon.PosX},"Y":${mon.PosZ},"Z":${mon.PosY}},"Radius":60.0,"Angle":225,"Rotation":-112.5,"Color":${鼠鼠aoe颜色},"Delay":0,"During":9.2}`);
                    data.safe = '左';
                }
                if (matches.id == '7756') {
                    postAoe(`{"Name":"属鼠左刀","AoeType":"Sector","CentreType":"PostionValue","CentreValue":{"X":${mon.PosX},"Y":${mon.PosZ},"Z":${mon.PosY}},"Radius":60.0,"Angle":225,"Rotation":112.5,"Color":${鼠鼠aoe颜色},"Delay":0,"During":9.2}`);
                    data.safe = '右';
                }
            }
        },
        {
            id: '鼠鼠 电气除尘',
            type: 'StartsUsing',
            netRegex: { id: ['775D', '776A'] },
            run: async (data, matches) => {
                if (!电气除尘范围) return;
                postAoe(`{"Name":"鼠鼠电气除尘","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":30,"Angle":46,"Rotation":0,"Color":${鼠鼠aoe颜色},"Delay":0,"During":5}`);
            },
        },
        {
            id: '鼠鼠 滑行后aoe',
            type: 'StartsUsing',
            netRegex: { id: '775E' },
            run: async (data, matches) => {
                if (!冰凉除尘范围) return;
                if (data.boss == '绿') {
                    postAoe(`{"Name":"鼠鼠滑行后风清除尘","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":60,"InnerRadius":5,"Color":${鼠鼠aoe颜色},"Delay":6,"During":3}`);
                }
                else if (data.boss == '黄') {
                    postAoe(`{"Name":"鼠鼠滑行后电气除尘","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":30,"Angle":46,"Rotation":45,"Color":${鼠鼠aoe颜色},"Delay":6,"During":3}`);
                    postAoe(`{"Name":"鼠鼠滑行后电气除尘","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":30,"Angle":46,"Rotation":135,"Color":${鼠鼠aoe颜色},"Delay":6,"During":3}`);
                    postAoe(`{"Name":"鼠鼠滑行后电气除尘","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":30,"Angle":46,"Rotation":-45,"Color":${鼠鼠aoe颜色},"Delay":6,"During":3}`);
                    postAoe(`{"Name":"鼠鼠滑行后电气除尘","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":30,"Angle":46,"Rotation":-135,"Color":${鼠鼠aoe颜色},"Delay":6,"During":3}`);

                }

                else {
                    postAoe(`{"Name":"鼠鼠滑行后冰凉除尘","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":60,"Width":10,"Rotation":0.0,"Color":${鼠鼠aoe颜色},"Delay":6,"During":3}`);
                    postAoe(`{"Name":"鼠鼠滑行后冰凉除尘","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":60,"Width":10,"Rotation":90.0,"Color":${鼠鼠aoe颜色},"Delay":6,"During":3}`);
                    postAoe(`{"Name":"鼠鼠滑行后冰凉除尘","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":60,"Width":10,"Rotation":180.0,"Color":${鼠鼠aoe颜色},"Delay":6,"During":3}`);
                    postAoe(`{"Name":"鼠鼠滑行后冰凉除尘","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":60,"Width":10,"Rotation":270.0,"Color":${鼠鼠aoe颜色},"Delay":6,"During":3}`);
                }

            },
        },
        {
            id: '鼠鼠 小怪冰凉除尘',
            type: 'StartsUsing',
            netRegex: { id: ['7768', '775B'] },
            run: async (data, matches) => {
                if (!冰凉除尘范围) return;
                postAoe(`{"Name":"小怪冰凉除尘","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":60,"Width":10,"Rotation":0.0,"Color":${鼠鼠aoe颜色},"Delay":0,"During":5}`);
                postAoe(`{"Name":"小怪冰凉除尘","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":60,"Width":10,"Rotation":90.0,"Color":${鼠鼠aoe颜色},"Delay":0,"During":5}`);
                postAoe(`{"Name":"小怪冰凉除尘","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":60,"Width":10,"Rotation":180.0,"Color":${鼠鼠aoe颜色},"Delay":0,"During":5}`);
                postAoe(`{"Name":"小怪冰凉除尘","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":60,"Width":10,"Rotation":270.0,"Color":${鼠鼠aoe颜色},"Delay":0,"During":5}`);

            },
        },
        {
            id: '鼠鼠 风清除尘',
            type: 'StartsUsing',
            netRegex: { id: ['7769', '775C'] },
            run: async (data, matches) => {
                if (!风清除尘范围) return;
                postAoe(`{"Name":"鼠鼠风清除尘","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":60,"InnerRadius":5,"Color":${鼠鼠aoe颜色},"Delay":0,"During":5}`);
            },
        },

        //7757变绿
        //7757变白
        {
            id: '鼠鼠 变色',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: ['7758', '7757', '7759'] }),
            run: (data, matches, output) => {
                if (matches.id == '7757') data.boss = '绿';
                if (matches.id == '7758') data.boss = '白';
                if (matches.id == '7759') data.boss = '黄';

            }
        },
        {
            id: '鼠鼠 变色清除',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: ['7758', '7757'] }),
            delaySeconds: 20,
            run: (data, matches, output) => {
                delete data.boss;

            }
        },
        //CEA 白（蓝） CEB黄球 CE9绿球
        {
            id: '鼠鼠 球处理',
            type: 'GainsEffect',
            netRegex: NetRegexes.gainsEffect({ effectId: ['CEA', 'CEB', 'CE9'], capture: true }),
            condition: (data, matches) => Boolean(data.boss),
            infoText: (data, matches, output) => {
                let id = parseInt(matches.targetId, 16)
                if (data.yellow === undefined) data.yellow = [];
                if (data.white === undefined) data.white = [];
                if (matches.effectId == 'CEA') data.white.push(id);
                if (matches.effectId == 'CEB') data.yellow.push(id);
            }
        },
        {
            id: '鼠鼠 球连线',
            type: 'Tether',
            netRegex: NetRegexes.tether({ id: '00D8' }),
            durdurationSeconds: 15,
            condition: Conditions.targetIsYou(),
            run: async (data, matches) => {
                data.绳次数++;
                let result = await callOverlayHandler({
                    call: 'getCombatants',
                    ids: [parseInt(matches.sourceId, 16)],
                });

                let mon = result.combatants[0];
                if (data.绳次数 == 1) {
                    let 方位 = Math.round(4 - 4 * Math.atan2(mon.PosX + 335, mon.PosY + 155) / Math.PI) % 8;
                    let cx = -335;
                    let cy = 471;
                    let cz = -155;
                    let x = 0;
                    let z = 0;
                    let str = '初始'
                    //正点
                    if (方位 % 2 == 0) {
                        console.log("正点球");
                        if (data.boss == '绿') {
                            console.log("绿中");
                            if (data.yellow.includes(mon.ID)) {
                                //中央月环 正点黄球 向外一格
                                console.log("黄连线");
                                x = mon.PosX + (mon.PosX - cx) * 0.5;
                                z = mon.PosY + (mon.PosY - cz) * 0.5;
                                let str = '月环正黄'
                            }
                            if (data.white.includes(mon.ID)) {
                                //中央月环 正点蓝 横向一格
                                console.log("蓝连线");
                                x = mon.PosX + (mon.PosY - cz) * 0.5;
                                z = mon.PosY + (mon.PosX - cx) * 0.5;
                                let str = '月环正蓝'
                            }

                        }
                        if (data.boss == '白') {
                            console.log("蓝中");
                            if (data.white.includes(mon.ID)) {
                                //中央冰球 正点蓝
                                console.log("蓝连线");
                                x = mon.PosX + (mon.PosX - cx) * 0.5;
                                z = mon.PosY + (mon.PosY - cz) * 0.5;
                                let str = '十字正蓝'
                            }
                            if (data.yellow.includes(mon.ID)) {
                                //中央冰球 正点黄
                                console.log("黄连线");
                                x = mon.PosX + (mon.PosX - cx) * 0.5;
                                z = mon.PosY + (mon.PosY - cz) * 0.5;
                                let str = '十字正黄'
                            }

                        }
                    }
                    //斜点
                    else {
                        console.log("斜点球");
                        if (data.boss == '绿') {
                            console.log("绿中");
                            if (data.yellow.includes(mon.ID)) {
                                //中央月环，斜点黄 拉到正正点
                                console.log("黄连线");
                                x = mon.PosX - (mon.PosX - cx) * 0.5;
                                z = mon.PosY;
                                let str = '月环斜黄';
                            }
                            if (data.white.includes(mon.ID)) {
                                //中央月环 斜点蓝 往边线
                                console.log("蓝连线");
                                x = mon.PosX + (mon.PosX - cx) * 0.5;
                                z = mon.PosY;
                                let str = '月环斜蓝';
                            }

                        }
                        if (data.boss == '白') {
                            console.log("蓝中");
                            if (data.yellow.includes(mon.ID)) {
                                //中央十字 斜点黄
                                console.log("黄连线");
                                x = mon.PosX + (mon.PosX - cx) * 0.5;
                                z = mon.PosY + (mon.PosY - cz) * 0.5;
                                let str = '十字斜黄'
                            }
                            if (data.white.includes(mon.ID)) {
                                //中央十字 斜点蓝
                                console.log("蓝连线");
                                x = mon.PosX + (mon.PosX - cx) * 0.5;
                                z = mon.PosY + (mon.PosY - cz) * 0.5;
                                let str = '十字斜蓝'
                            }

                        }
                    }
                    postAoe(`{"Name":"${str} 点","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${x},"Y":${cy},"Z":${z}},"Radius":0.2,"Color":${鼠鼠aoe颜色},"Delay":0,"During":7}`);
                    postAoe(`{"Name":"${str} 线","AoeType":"Link","CentreType":"ActorName","CentreValue":"${data.me}","Centre2Type":"PostionValue","Centre2Value":{"X":${x},"Y":${cy},"Z":${z}},"Thikness":10,"Color":4278255360,"Delay":0,"During":7}`);
                }

            }
        },
        {
            id: '斗士 突击范围',
            type: 'StartsUsing',
            netRegex: { id: ['765B', '765C'] },
            run: async (data, matches) => {
                if (!突击范围) return;
                if (matches.id == '765B') {
                    postAoe(`{"Name":"斗士 突击范围 短","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":60,"Width":60,"Rotation":0.0,"Color":${斗士aoe颜色},"Delay":0,"During":10.5}`);
                } else if (matches.id == '765C') {
                    postAoe(`{"Name":"斗士 突击范围 长","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":60,"Width":60,"Rotation":180,"Color":${斗士aoe颜色},"Delay":10.5,"During":2}`);
                }
            },
        },
        {
            id: '斗士 钢铁范围',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: ['765D', '765E', '765F'] }),
            run: (data, matches, output) => {
                if (matches.id == '765D') {
                    postAoe(`{"Name":"斗士钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":8,"Color":${斗士aoe颜色},"Delay":0,"During":10}`);
                    postAoe(`{"Name":"斗士月环","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":30,"InnerRadius":8,"Color":${斗士aoe颜色},"Delay":10,"During":2}`);

                }
                if (matches.id == '765E') {
                    postAoe(`{"Name":"斗士钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":13,"Color":${斗士aoe颜色},"Delay":0,"During":10}`);
                    postAoe(`{"Name":"斗士月环","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":30,"InnerRadius":13,"Color":${斗士aoe颜色},"Delay":10,"During":2}`);

                }
                if (matches.id == '765F') {
                    postAoe(`{"Name":"斗士钢铁","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":18,"Color":${斗士aoe颜色},"Delay":0,"During":10}`);
                    postAoe(`{"Name":"斗士月环","AoeType":"Donut","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":30,"InnerRadius":18,"Color":${斗士aoe颜色},"Delay":10,"During":2}`);

                }
            }
        },
        {
            id: '斗士 分散分摊范围',
            type: 'GainsEffect',
            netRegex: NetRegexes.gainsEffect({ effectId: ['CDA', 'CDC', 'CDD'], capture: true }),
            alertText: (data, matches, output) => {
                let delayTime = parseFloat(matches.duration) - 3;

                if (matches.effectId == 'CDA') {
                    //分散
                    postAoe(`{"Name":"斗士 分散范围","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":6,"Color":1073807359,"Delay":${delayTime},"During":3}`);

                }
                if (matches.effectId == 'CDD') {
                    //分摊
                    postAoe(`{"Name":"斗士 分摊范围","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":5,"Color":1073807104,"Delay":${delayTime},"During":3}`);

                }
                if (matches.effectId == 'CDC') {
                    //引导
                    postAoe(`{"Name":"斗士 引导范围","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.targetId},"Radius":5,"Color":1073807359,"Delay":${delayTime},"During":3}`);

                }
            }
        },
        {
            id: '斗士 引导地面范围',
            type: 'Ability',
            netRegex: { id: '7677' },
            suppressSeconds: 10,
            alertText: (data, matches, output) => {
                postAoe(`{"Name":"Circle Example","AoeType":"Circle","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Radius":5,"Color":1090453759,"Delay":0,"During":4.5}`);
            }
        },
        {
            id: '斗士 喷火范围',
            type: 'StartsUsing',
            netRegex: { id: ['766F', '7670'] },
            run: async (data, matches) => {
                if (!突击范围) return;
                if (matches.id == '7670') {
                    postAoe(`{"Name":"白色喷火","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":20,"Width":10,"Rotation":180,"Color":2113929215,"Delay":0,"During":10}`);
                } else if (matches.id == '766F') {
                    postAoe(`{"Name":"黄色喷火","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"Length":20,"Width":10,"Rotation":0.0,"Color":1073807359,"Delay":0,"During":10}`);
                }
            },
        },
        {
            id: '祭祀 阶段转换',
            type: 'StartsUsing',
            netRegex: { id: ['7491'] },
            run: (data, matches) => {
                data.boos3parse++;
            },
        },
        {
            id: '祭祀 挡刀',
            type: 'Ability',
            netRegex: { id: ['74B1', '74B2'] },
            run: (data, matches, output) => {
                let dtime = 2;
                let dur = 8;
                if (matches.id == '74B2') {
                    dtime = 0;
                    dur = 10;
                }
                postAoe(`{"Name":"祭祀 挡刀","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Length":65,"Width":8,"Rotation":0.0,"Color":${祭祀aoe颜色},"Delay":${dtime},"During":${dur}}`);
            }
        },
        {
            id: '祭祀 T死刑',
            type: 'StartsUsing',
            netRegex: { id: ['74AD'] },
            run: (data, matches) => {
                postAoe(`{"Name":"祭祀 T死刑","AoeType":"Sector","CentreType":"ActorId","CentreValue":0x${matches.sourceId},"TrackType":"IdTrack","TrackValue":0x${matches.targetId},"Radius":40,"Angle":90,"Rotation":0,"Color":${祭祀aoe颜色},"Delay":0,"During":5}`);
            },
        },
        {
            id: '祭祀 P1 转转转火圈',
            regex: /Debug FB:ObjectEffect:(?<sourceId>[^:]*):(?<param1>[^:]*):(?<param2>[^:]*):/,
            run: async (data, matches) => {
                if (data.boos3parse != 1) return;
                let result = await callOverlayHandler({
                    call: 'getCombatants',
                    ids: [parseInt(matches.sourceId, 16)],
                });
                let mon = result.combatants[0];
                if (mon.BNpcID != 2013025) return;
                let v = mon.Heading;
                if (matches.param1 == '64' && matches.param2 == '128') {
                    v -= Math.PI / 2;
                    let x = Math.sin(v) * 10 + mon.PosX;
                    let z = Math.cos(v) * 10 + mon.PosY;
                    postAoe(`{"Name":"火球范围","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${x},"Y":${mon.PosZ},"Z":${z}},"Radius":12,"Color":${斗士aoe颜色},"Delay":0,"During":12}`);

                }
                if (matches.param1 == '256' && matches.param2 == '512') {
                    v += Math.PI / 2;
                    let x = Math.sin(v) * 10 + mon.PosX;
                    let z = Math.cos(v) * 10 + mon.PosY;
                    postAoe(`{"Name":"火球范围","AoeType":"Circle","CentreType":"PostionValue","CentreValue":{"X":${x},"Y":${mon.PosZ},"Z":${z}},"Radius":12,"Color":${斗士aoe颜色},"Delay":0,"During":12}`);

                }
            },
        },

        {
            id: '祭祀 P2 石板aoe',
            type: 'AddedCombatant',
            netRegex: NetRegexes.addedCombatantFull({ npcNameId: '11397' }),
            run: (data, matches) => {
                if (data.boos3parse != 2) return;
                postAoe(`{"Name":"P2石板aoe","AoeType":"Rect","CentreType":"ActorId","CentreValue":0x${matches.id},"Length":40,"Width":10,"Rotation":0.0,"Color":1073742079,"Delay":15,"During":7}`);

            },
        },
        {
            id: '祭祀 P3 传送阵目的地',
            regex: /Debug FB:ObjectEffect:(?<sourceId>[^:]*):(?<param1>[^:]*):(?<param2>[^:]*):/,
            run: async (data, matches) => {
                if (data.boos3parse != 3) return;
                let result = await callOverlayHandler({
                    call: 'getCombatants',
                    ids: [parseInt(matches.sourceId, 16)],
                });
                let mon = result.combatants[0];
                if (mon.BNpcID != 2013025) return;
                let v = mon.Heading;
                if (matches.param1 == '64' && matches.param2 == '128') {
                    v -= Math.PI / 2;
                    let x = Math.sin(v) * 10 + mon.PosX;
                    let z = Math.cos(v) * 10 + mon.PosY;
                    if (z > -85 || z < -125) return;
                    postAoe(`{"Name":"P3传送阵目的地","AoeType":"Link","CentreType":"PostionValue","CentreValue":{"X":${x},"Y":${mon.PosZ},"Z":${z}},"Centre2Type":"PostionValue","Centre2Value":{"X":${mon.PosX},"Y":${mon.PosZ},"Z":${mon.PosY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":12}`);

                }
                if (matches.param1 == '256' && matches.param2 == '512') {
                    v += Math.PI / 2;
                    let x = Math.sin(v) * 10 + mon.PosX;
                    let z = Math.cos(v) * 10 + mon.PosY;
                    if (z > -85 || z < -125) return;
                    postAoe(`{"Name":"P3传送阵目的地","AoeType":"Link","CentreType":"PostionValue","CentreValue":{"X":${x},"Y":${mon.PosZ},"Z":${z}},"Centre2Type":"PostionValue","Centre2Value":{"X":${mon.PosX},"Y":${mon.PosZ},"Z":${mon.PosY}},"Thikness":10,"Color":4278255360,"Delay":0,"During":12}`);

                }
            },
        },
        {
            id: '祭祀 P4 石板收集',
            regex: /Debug FB:ObjectEffect:(?<sourceId>[^:]*):(?<param1>[^:]*):(?<param2>[^:]*):/,
            run: async (data, matches) => {
                if (data.boos3parse != 4) return;
                if (matches.param1 != '64' && matches.param1 != '256') return;
                let result = await callOverlayHandler({
                    call: 'getCombatants',
                    ids: [parseInt(matches.sourceId, 16)],
                });
                let mon = result.combatants[0];
                if (mon.BNpcID != 2013025) return;


                let v = mon.Heading;
                if (matches.param1 == '64' && matches.param2 == '128') {
                    v -= Math.PI / 2;
                }
                if (matches.param1 == '256' && matches.param2 == '512') {
                    v += Math.PI / 2;
                }
                let x = Math.sin(v) * 10 + mon.PosX;
                let z = Math.cos(v) * 10 + mon.PosY;
                if (Math.abs(mon.PosX - 289) > 1) {
                    data.不安全地板[Math.round((z + 120) + 0)] = 1;
                    data.不安全地板[Math.round((z + 120) + 1)] = 1;
                    data.不安全地板[Math.round((z + 120) + 2)] = 1;
                } else {
                    data.不安全地板[Math.round((x - 279) / 10) + 0] = 1;
                    data.不安全地板[Math.round((x - 279) / 10) + 10] = 1;
                    data.不安全地板[Math.round((x - 279) / 10) + 20] = 1;
                    data.不安全地板[Math.round((x - 279) / 10) + 30] = 1;
                }
            },
        },
        {
            id: '祭祀 P4 石板AOE',
            regex: /Debug FB:ObjectEffect:(?<sourceId>[^:]*):(?<param1>[^:]*):(?<param2>[^:]*):/,
            delaySeconds: 0.2,
            suppressSeconds: 1,
            run: async (data, matches) => {
                if (data.boos3parse != 4) return;
                if (matches.param1 != '64' && matches.param1 != '256') return;
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 3; j++) {
                        let p = i * 10 + j;
                        if (data.不安全地板[p] !== undefined) {
                            let x = j * 10 + 279;
                            let z = i * 10 - 125;
                            let y = 533;
                            postAoe(`{"Name":"祭祀P4石板${p}","AoeType":"Rect","CentreType":"PostionValue","CentreValue":{"X":${x},"Y":${y},"Z":${z}},"Length":10,"Width":10,"Rotation":0.0,"Color":${斗士aoe颜色},"Delay":0,"During":12}`);
                        }
                    }
                }
                data.不安全地板 = {};
            },
        },


        {
            id: 'P2分摊',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '766C' }),
            alertText: (data, matches, output) => {
                return '分摊'
            }
        },
        {
            id: 'P2踩塔',
            type: 'GainsEffect',
            netRegex: NetRegexes.gainsEffect({ effectId: 'CDB', capture: true }),
            condition: Conditions.targetIsYou(),
            durdurationSeconds: 5,
            delaySeconds: 12,
            infoText: (data, matches, output) => {
                if (parseFloat(matches.duration) <= 19) return '先放圈后踩塔'
                if (parseFloat(matches.duration) > 19) return '先踩塔后放圈'
            }
        },
        {
            id: 'P2踩塔播报',
            type: 'GainsEffect',
            netRegex: NetRegexes.gainsEffect({ effectId: 'CDB', capture: true }),
            condition: Conditions.targetIsYou(),
            durdurationSeconds: 5,
            delaySeconds: 19,
            infoText: (data, matches, output) => {
                if (parseFloat(matches.duration) <= 19) return '踩塔'
                if (parseFloat(matches.duration) > 19) return '放圈'
            }
        },



        {
            id: 'P2分摊点名播报',
            type: 'GainsEffect',
            netRegex: NetRegexes.gainsEffect({ effectId: ['CDA', 'CDC'], capture: true }),
            delaySeconds: 17,
            alertText: (data, matches, output) => {
                let 分摊时间;
                if (matches.effectId == 'CDA' && matches.target == data.me) {
                    分摊时间 = parseFloat(matches.duration);
                }
                if (matches.target == data.me) {
                    if (分摊时间 >= 16 && matches.effectId == 'CDA') return '分散'
                    if (分摊时间 <= 14 && matches.effectId == 'CDA') return '分摊'
                }


            }
        },

        {
            id: 'P2九连环',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '7666' }),
            alertText: (data, matches, output) => {
                return '拉线九连环，中央集合'
            }
        },
        {
            id: 'P2死刑',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '7672' }),
            alertText: (data, matches, output) => {
                if (data.role == 'tank') {
                    return '死刑'
                }

            }
        },

        {
            id: 'P3挡刀',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '74B3' }),
            alertText: (data, matches, output) => {
                if (data.Vulnerabl.includes(data.me)) return '去背后躲避'
                else return '在前挡刀';
            }
        },
        {
            id: 'P3三运buff',
            type: 'GainsEffect',
            netRegex: NetRegexes.gainsEffect({ effectId: 'B9A', capture: true }),
            condition: Conditions.targetIsYou(),
            alertText: (data, matches, output) => {
                if (matches.count == '1CD') return '下方，踩内侧传送'
                if (matches.count == '1D3') return '下方，踩外侧传送'
                if (matches.count == '1CE') return '上方，踩外侧传送'
                if (matches.count == '1D2') return '上方，踩内侧传送'
            }
        },

    ],

});
