// For an introduction to the Blank template, see the following documentation:
// https://go.microsoft.com/fwlink/?LinkId=232509

(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var isFirstActivation = true;

    var ViewManagement = Windows.UI.ViewManagement;
    var ApplicationViewWindowingMode = ViewManagement.ApplicationViewWindowingMode;
    var ApplicationView = ViewManagement.ApplicationView;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.voiceCommand) {
            // TODO: Handle relevant ActivationKinds. For example, if your app can be started by voice commands,
            // this is a good place to decide whether to populate an input field or choose a different initial view.
        }
        else if (args.detail.kind === activation.ActivationKind.launch) {
            // A Launch activation happens when the user launches your app via the tile
            // or invokes a toast notification by clicking or tapping on the body.
            if (args.detail.arguments) {
                // TODO: If the app supports toasts, use this value from the toast payload to determine where in the app
                // to take the user in response to them invoking a toast notification.
            }
            else if (args.detail.previousExecutionState === activation.ApplicationExecutionState.terminated) {
                // TODO: This application had been suspended and was then terminated to reclaim memory.
                // To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
                // Note: You may want to record the time when the app was last suspended and only restore state if they've returned after a short period.
            }
        }

        if (!args.detail.prelaunchActivated) {
            // TODO: If prelaunchActivated were true, it would mean the app was prelaunched in the background as an optimization.
            // In that case it would be suspended shortly thereafter.
            // Any long-running operations (like expensive network or disk I/O) or changes to user state which occur at launch
            // should be done here (to avoid doing them in the prelaunch case).
            // Alternatively, this work can be done in a resume or visibilitychanged handler.
        }

        if (isFirstActivation) {
            // TODO: The app was activated and had not been running. Do general startup initialization here.
            document.addEventListener("visibilitychange", onVisibilityChanged);
            args.setPromise(WinJS.UI.processAll());
            ApplicationView.preferredLaunchWindowingMode = ApplicationViewWindowingMode.fullScreen;
        }

        isFirstActivation = false;
    };

    function onVisibilityChanged(args) {
        if (!document.hidden) {
            // TODO: The app just became visible. This may be a good time to refresh the view.
        }
    }

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
        // You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
        // If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
    };
    var UI, uData, tBool, dateTool, mBool, myData;

    myData = {
        mAu: 0,
        aAu: 0,
        sAu: 0
    }

    dateTool = {
        month: "",
        week: "",
        year: ""
    };

    tBool = 0;
    mBool = 0;

    uData = {
        siteName: "",
        userName: "",
        money: 10000,
        lvl: 1,
        gndr: "",
        hum: 0,
        int: 0,
        cre: 0,
        luck: 0,
        chr: 0,
        spd: 0
    };

    var mnth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    UI = {
        createEle: (x) => { return document.createElement(x) },
        bySelAll: (x) => { return document.querySelectorAll(x) },
        bySel: (x) => { return document.querySelector(x) },
        init: () => {
            var dta = localStorage.getItem("myData");

            if (!dta || dta === null) {

                myData.mAu = 0;
                myData.aAu = 0;
                myData.sAu = 0;

                localStorage.setItem("myData", JSON.stringify(myData));
            }

            var ud = localStorage.getItem("uData");
            if (!ud || ud === null) {
                localStorage.setItem("uData", JSON.stringify(uData));
            }

            var dt = localStorage.getItem("dateTool");
            if (!dt || dt === null) {
                var d = new Date();
                var y = d.getFullYear(),
                    m = d.getMonth();

                dateTool.month = m;
                dateTool.week = 1;
                dateTool.year = y;

                localStorage.setItem("dateTool", JSON.stringify(dateTool));
            }


            localStorage.setItem("tBool", 0);
            localStorage.setItem("mBool", 0);

            UI.myLoad();
        },
        myLoad: () => {
            var myFrame = UI.createEle("div"),
                startBtn = UI.createEle("button"),
                contBtn = UI.createEle("button"),
                delBtn = UI.createEle("button");
            var uD = localStorage.getItem("uData");
            if (uD) {
                var uuu = JSON.parse(uD);
            }

            delBtn.innerHTML = "Delete All Storage";
            delBtn.className = "startPageBtn";
            delBtn.onclick = UI.deleteAllStorage;

            if (uuu.siteName != "") {
                contBtn.innerHTML = "Continue";
                contBtn.className = "startPageBtn";
                contBtn.onclick = UI.contProgram(myFrame, startBtn, delBtn, contBtn);
                myFrame.appendChild(contBtn);
            }

            startBtn.innerHTML = "Start New";
            startBtn.className = "startPageBtn";
            startBtn.onclick = UI.startProgram(myFrame, startBtn, delBtn, contBtn);

            myFrame.className = "myFrame";

            myFrame.appendChild(startBtn);

            myFrame.appendChild(delBtn);

            dvContain.appendChild(myFrame);
        },
        contProgram: (myFrame, startBtn, delBtn, contBtn) => {
            return () => {
                startBtn.remove();
                contBtn.remove();
                delBtn.remove();
                UI.proceedGame();
            }
        },
        startProgram: (myFrame, startBtn, delBtn, contBtn) => {
            return () => {
                var playerSetupPage = UI.createEle("div"), elems;

                elems = "<span id='setupX' class='xBtns'>X</span>";
                elems += "<h2>Setup Your Company</h2>";
                elems += "<p><input type='text' id='inputSiteName' class='setupItems' /><label for='inputSiteName' class='infoLabels'>Site Name</label></p>";
                elems += "<p><input type='text' id='inputUserName' class='setupItems' /><label for='inputUserName' class='infoLabels'>User Name</label></p>";
                elems += "<p><input id='rd1' type='radio' checked class='setupItems' name='rds' /><label for='rd1'>♂</label>";
                elems += "<input id='rd2' type='radio' unchecked class='setupItems' name='rds' /><label for='rd2'>♀</label>";
                elems += "<span id='genderSpn'>Male</span></p>";
                elems += "<p><div id='playerBox'>BOX</div></p>";
                elems += "<p><input type='button' value='⭕' class='setupConfirm' /></p>";

                playerSetupPage.className = "playerSetupPage";
                playerSetupPage.innerHTML = elems;

                startBtn.remove();
                delBtn.remove();
                if (contBtn) {
                    contBtn.remove();
                }
                myFrame.appendChild(playerSetupPage);

                setTimeout(() => {
                    playerSetupPage.className = "playerSetupPage_full";
                    var setupItems = UI.bySelAll(".setupItems");
                    var setupConfirm = UI.bySel(".setupConfirm");
                    var genderSpn = UI.bySel("#genderSpn");
                    var setupX = UI.bySel("#setupX");

                    setupX.onclick = UI.goHome(playerSetupPage, myFrame);

                    for (var i = 0; i < setupItems.length; i++) {
                        setupItems[0].onclick = () => { return setupItems[0].select() };
                        setupItems[1].onclick = () => { return setupItems[1].select() };
                        setupItems[i].onkeyup = UI.checkSetupData(setupItems, i, setupConfirm, genderSpn);
                        setupItems[i].onblur = UI.checkSetupData(setupItems, i, setupConfirm, genderSpn);
                        setupItems[2].onclick = UI.checkSetupData(setupItems, i, setupConfirm, genderSpn);
                        setupItems[3].onclick = UI.checkSetupData(setupItems, i, setupConfirm, genderSpn);
                    }

                }, 50);

            }
        },
        checkSetupData: (setupItems, i, setupConfirm, genderSpn) => {
            return () => {
                var ud = localStorage.getItem("uData");

                uData.siteName = setupItems[0].value;
                uData.userName = setupItems[1].value;

                if (setupItems[3].checked) {
                    genderSpn.innerHTML = "Female";
                    uData.gndr = genderSpn.innerHTML;
                } else {
                    genderSpn.innerHTML = "Male";
                    uData.gndr = genderSpn.innerHTML;
                }
                localStorage.setItem("uData", JSON.stringify(uData));

                if (setupItems[0].value != "" && setupItems[1].value != "") {
                    setupConfirm.value = "✔";
                    setupConfirm.onclick = UI.proceedGame;
                } else {
                    setupConfirm.value = "⭕";

                }
            }
        },
        proceedGame: () => {
            var ud = localStorage.getItem("uData"),
                playerSetupPage = UI.bySel(".playerSetupPage_full");
            if (playerSetupPage) {
                var myFrame = playerSetupPage.parentNode;

                setTimeout(() => {
                    playerSetupPage.className = "playerSetupPage";
                    setTimeout(() => {
                        playerSetupPage.remove();
                        UI.beginGameSession(myFrame, ud);
                    }, 1000);
                }, 50);
            } else {
                var myFrame = UI.bySel(".myFrame");
                UI.beginGameSession(myFrame, ud);
            }
        },
        homeClimate: (myFrame, ud) => {
            if (ud) {
                var uuu = JSON.parse(ud);
            }
            var climate = UI.createEle("div");

            climate.className = "climate";
            climate.style.backgroundImage = "url(../images/walls/d" + uuu.lvl + ".jpg)";

            myFrame.appendChild(climate);

            setTimeout(() => {
                climate.className = "climate_full";
            }, 700);
        },
        beginGameSession: (myFrame, ud) => {
            /* 
              -loading the game ()'s from here.  Note: Some functions depend on scope.
              -Scope order determined here
            */
            UI.doTable(myFrame, ud);
            UI.doTimer(myFrame, ud);
            UI.doTimerControls(myFrame, ud);
            UI.doMoneyTab(myFrame, ud);
            UI.memesFunc(myFrame, ud);
            UI.homeClimate(myFrame, ud);
        },
        doMoneyTab: (myFrame, ud) => {
                var moneyTab = UI.createEle("div");
                if (ud) {
                    var uuu = JSON.parse(ud);
                }
                moneyTab.className = "moneyTab";
                moneyTab.innerHTML = "💰 &nbsp; <span id='moneySlot'>" + uuu.money + "</span>";

                myFrame.appendChild(moneyTab);

                setTimeout(() => {
                    moneyTab.className = "moneyTab_full";
                }, 600);
        },
        makeMoney: (myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings) => {
            return () => {
                if (dta) {
                    var ddd = JSON.parse(dta);
                }

                var page = UI.createEle("div");

                page.className = "menuPages";
                page.innerHTML = "<h2><span>💰 Financial Report</span><span id='xMeme'>X</span></h2>";

                myFrame.appendChild(page);

                newMeme.onclick = null;
                researchMeme.onclick = null;
                budgetMeme.onclick = null;
                settings.onclick = null;

                setTimeout(() => {
                    page.className = "menuPages_full";
                    var xMeme = UI.bySel("#xMeme");
                    xMeme.onclick = UI.xMoneyFunc(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page);

                }, 300);
            }
        },
        xMoneyFunc: (myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page) => {
            return () => {
                page.className = "menuPages";

                setTimeout(() => {
                    newMeme.onclick = UI.makeMemer(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);
                    researchMeme.onclick = UI.makeResearch(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);
                    budgetMeme.onclick = UI.makeMoney(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);
                    settings.onclick = UI.makeSettings(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);
                    page.remove();
                }, 1200);
            }
        },
        makeResearch: (myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings) => {
            return () => {
                if (dta) {
                    var ddd = JSON.parse(dta);
                }

                var page = UI.createEle("div");

                page.className = "menuPages";
                page.innerHTML = "<h2><span>🔬 Science and Research</span><span id='xMeme'>X</span></h2>";

                myFrame.appendChild(page);

                newMeme.onclick = null;
                researchMeme.onclick = null;
                budgetMeme.onclick = null;
                settings.onclick = null;

                setTimeout(() => {
                    page.className = "menuPages_full";
                    var xMeme = UI.bySel("#xMeme");
                    xMeme.onclick = UI.xResearchFunc(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page);

                }, 300);
            }
        },
        xResearchFunc: (myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page) => {
            return () => {
                page.className = "menuPages";

                setTimeout(() => {
                    newMeme.onclick = UI.makeMemer(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);
                    researchMeme.onclick = UI.makeResearch(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);
                    budgetMeme.onclick = UI.makeMoney(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);
                    settings.onclick = UI.makeSettings(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);
                    page.remove();
                }, 1200);
            }
        },
        makeMemer: (myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings) => {
            return () => {
                if (dta) {
                    var ddd = JSON.parse(dta);
                }

                var page = UI.createEle("div");

                page.className = "menuPages";
                page.innerHTML = "<h2><span>💡 Create a New Project</span><span id='xMeme'>X</span></h2>";

                myFrame.appendChild(page);

                newMeme.onclick = null;
                researchMeme.onclick = null;
                budgetMeme.onclick = null;
                settings.onclick = null;

                setTimeout(() => {
                    page.className = "menuPages_full";
                    var xMeme = UI.bySel("#xMeme");
                    xMeme.onclick = UI.xMemeFunc(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page);

                }, 300);
            }
        },
        xMemeFunc: (myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page) => {
            return () => {
                page.className = "menuPages";

                setTimeout(() => {
                    newMeme.onclick = UI.makeMemer(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);
                    researchMeme.onclick = UI.makeResearch(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);
                    budgetMeme.onclick = UI.makeMoney(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);
                    settings.onclick = UI.makeSettings(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);
                    page.remove();
                }, 1200);
            }
        },
        makeSettings: (myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings) => {
            return () => {
                if (dta) {
                    var ddd = JSON.parse(dta);
                }

                var page = UI.createEle("div"), elems;

                elems = "<h2><span>⚙ Settings</span><span id='xMeme'>X</span></h2>";
                elems += "<p><button id='homeBtn'>Home</button></p>";

                page.className = "menuPages";
                page.innerHTML = elems;

                myFrame.appendChild(page);

                newMeme.onclick = null;
                researchMeme.onclick = null;
                budgetMeme.onclick = null;
                settings.onclick = null;

                setTimeout(() => {
                    page.className = "menuPages_full";
                    var xMeme = UI.bySel("#xMeme"),
                        homeBtn = UI.bySel("#homeBtn");
                    xMeme.onclick = UI.xSettFunc(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page);
                    
                    homeBtn.onclick = UI.globalHome;
                }, 300);
            }
        },
        xSettFunc: (myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page) => {
            return () => {
                page.className = "menuPages";

                setTimeout(() => {
                    newMeme.onclick = UI.makeMemer(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);
                    researchMeme.onclick = UI.makeResearch(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);
                    budgetMeme.onclick = UI.makeMoney(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);
                    settings.onclick = UI.makeSettings(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);
                    page.remove();
                }, 1200);
            }
        },
        memesFunc: (myFrame, ud) => {
            var dta = localStorage.getItem("myData");

            if (ud) {
                var uuu = JSON.parse(ud);
            }

            var memePanel = UI.createEle("div"),
                newMeme = UI.createEle("span"),
                researchMeme = UI.createEle("span"),
                budgetMeme = UI.createEle("span"),
                statusDiv = UI.createEle("div"),
                settings = UI.createEle("span");

            newMeme.onclick = UI.makeMemer(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);
            researchMeme.onclick = UI.makeResearch(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);
            budgetMeme.onclick = UI.makeMoney(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);
            settings.onclick = UI.makeSettings(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);

            newMeme.innerHTML = "💡";
            researchMeme.innerHTML = "🔬";
            budgetMeme.innerHTML = "💰";
            statusDiv.innerHTML = "" + uuu.userName + "";
            settings.innerHTML = "⚙";

            newMeme.className = "memePanelBtns";
            researchMeme.className = "memePanelBtns";
            budgetMeme.className = "memePanelBtns";
            statusDiv.className = "statusDiv";
            settings.className = "memePanelBtns";

            memePanel.className = "memePanel";

            memePanel.appendChild(newMeme);
            memePanel.appendChild(researchMeme);
            memePanel.appendChild(budgetMeme);
            memePanel.appendChild(statusDiv);
            memePanel.appendChild(settings);

            myFrame.appendChild(memePanel);

            setTimeout(() => {
                memePanel.className = "memePanel_full";
                setTimeout(() => {
                    statusDiv.className = "statusDiv_full";
                }, 400);
            }, 1100);
        },
        timeCheck: (play, pause) => {
            return () => {
                var dt = localStorage.getItem("dateTool");
                var tBool = localStorage.getItem("tBool");
                var timerItems = UI.bySelAll(".timerItems");


                if (tBool === "0") {
                    play.className = "timeCtrlItems_active";
                    pause.className = "timeCtrlItems";
                    localStorage.setItem("tBool", 1);
                    play.onclick = null;
                    pause.onclick = UI.timeCheck(play, pause);
                    ticker();
                    function ticker() {
                        var dt = localStorage.getItem("dateTool");
                        var tBl = localStorage.getItem("tBool");

                        if (dt) {
                            var dtt = JSON.parse(dt);
                        }

                        setTimeout(() => {
                            if (tBl === "1") {
                                if (+dtt.week < +4) {
                                    dateTool.month = +dtt.month;
                                    dateTool.week = +dtt.week + +1;
                                    dateTool.year = +dtt.year;

                                    localStorage.setItem("dateTool", JSON.stringify(dateTool));

                                    timerItems[0].innerHTML = mnth[dtt.month];
                                    timerItems[1].innerHTML = "Week " + dtt.week;
                                    timerItems[2].innerHTML = dtt.year;
                                } else {
                                    dateTool.week = +dtt.week - +3;
                                    if (+dtt.month < +11) {
                                        dateTool.month = +dtt.month + +1;
                                        dateTool.week = +dtt.week - +3;
                                        dateTool.year = +dtt.year;

                                        localStorage.setItem("dateTool", JSON.stringify(dateTool));

                                        timerItems[0].innerHTML = mnth[dtt.month];
                                        timerItems[1].innerHTML = "Week " + dtt.week;
                                        timerItems[2].innerHTML = dtt.year;

                                    } else {
                                        dateTool.month = +dtt.month - +11;
                                        dateTool.week = +dtt.week;
                                        dateTool.year = +dtt.year + +1;

                                        localStorage.setItem("dateTool", JSON.stringify(dateTool));

                                        timerItems[0].innerHTML = mnth[dtt.month];
                                        timerItems[1].innerHTML = "Week " + dtt.week;
                                        timerItems[2].innerHTML = dtt.year;
                                    }
                                }
                                ticker();
                            }
                        }, 1100);
                    }

                } else {
                    pause.className = "timeCtrlItems_active";
                    play.className = "timeCtrlItems";
                    localStorage.setItem("tBool", 0);
                    play.onclick = UI.timeCheck(play, pause);
                    pause.onclick = null;

                }

                //var x = localStorage.getItem("tBool");

                //console.log(x);
            }
        },
        doTimerControls: (myFrame, ud) => {
            if (ud) {
                var uuu = JSON.parse(ud);
            }
            var tBool = localStorage.getItem("tBool");
            var timeCtrlCell = UI.createEle("div"),
                pause = UI.createEle("span"),
                play = UI.createEle("span");

            pause.innerHTML = "&#10074;&#10074;";
            if (tBool === "0") {
                pause.className = "timeCtrlItems_active";
            } else {
                pause.className = "timeCtrlItems";
                pause.onclick = UI.timeCheck(play, pause);
            }

            play.innerHTML = "&#9658;";
            if (tBool === "1") {
                play.className = "timeCtrlItems_active";
            } else {
                play.className = "timeCtrlItems";
                play.onclick = UI.timeCheck(play, pause);
            }

            timeCtrlCell.className = "timeCtrlCell";

            timeCtrlCell.appendChild(pause);
            timeCtrlCell.appendChild(play);

            myFrame.appendChild(timeCtrlCell);

            setTimeout(() => {
                timeCtrlCell.className = "timeCtrlCell_full";
            }, 900);
        },
        doTimer: (myFrame, ud) => {
            var dt = localStorage.getItem("dateTool");
            if (dt) {
                var ddd = JSON.parse(dt);
            }

            if (ud) {
                var uuu = JSON.parse(ud);
            }

            var timer = UI.createEle("div"),
                month = UI.createEle("span"),
                week = UI.createEle("span"),
                year = UI.createEle("span");

            year.innerHTML = ddd.year;
            year.className = "timerItems";

            week.innerHTML = "Week " + ddd.week + "";
            week.className = "timerItems";

            month.innerHTML = mnth[ddd.month];
            month.className = "timerItems";

            timer.className = "myTimer";

            timer.appendChild(month);
            timer.appendChild(week);
            timer.appendChild(year);

            myFrame.appendChild(timer);

            setTimeout(() => {
                timer.className = "myTimer_full";
            }, 900);
        },
        doTable: (myFrame, ud) => {
            if (ud) {
                var uuu = JSON.parse(ud);
            }
            var table = UI.createEle("div");

            table.className = "theTable";
            for (var i = 1; i < 9; i++) {
                var elems = UI.createEle("div");

                elems.id = "elem_" + i + "";
                elems.className = "playerItems";

                table.appendChild(elems);
            }

            myFrame.appendChild(table);

            setTimeout(() => {
                var playerItems = UI.bySelAll(".playerItems");
                playerItems[0].innerHTML = uuu.siteName;
                playerItems[1].innerHTML = "<span>Level</span> <span>" + uuu.lvl + "</span>";
                playerItems[2].innerHTML = "<span>Humor</span> <span>" + uuu.hum + "</span>";
                playerItems[3].innerHTML = "<span>Intelligence</span> <span>" + uuu.int + "</span>";
                playerItems[4].innerHTML = "<span>Creativity</span> <span>" + uuu.cre + "</span>";
                playerItems[5].innerHTML = "<span>Luck</span> <span>" + uuu.luck + "</span>";
                playerItems[6].innerHTML = "<span>Charisma</span> <span>" + uuu.chr + "</span>";
                playerItems[7].innerHTML = "<span>Speed</span> <span>" + uuu.spd + "</span>";
                setTimeout(() => {
                    table.className = "theTable_full";
                }, 50);
            }, 1000);
        },
        globalHome: () => {
            location.reload();
        },
        goHome: (playerSetupPage, myFrame) => {
            return () => {
                if (playerSetupPage) {
                    playerSetupPage.className = "playerSetupPage";
                }
                setTimeout(() => {
                    myFrame.remove();
                    UI.myLoad();
                }, 1000);
            }
        },
        deleteAllStorage: () => {
            localStorage.clear();
            location.reload();
        }
    }

    window.onload = () => {
        UI.init();
    };
    app.start();

})();
