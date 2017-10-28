// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509

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
    var UI, uData;

    uData = {
        siteName: "",
        userName: "",
        lvl: 1,
        gndr: "",
        hum: 0,
        int: 0,
        cre: 0,
        luck: 0,
        chr: 0,
        spd: 0
    };

    UI = {
        createEle: (x) => { return document.createElement(x) },
        bySelAll: (x) => { return document.querySelectorAll(x) },
        bySel: (x) => { return document.querySelector(x) },
        init: () => {
            var ud = localStorage.getItem("uData");
            if (!ud || ud === null) {
                localStorage.setItem("uData", JSON.stringify(uData))
            }

            UI.myLoad();
        },
        myLoad: () => {
            var myFrame = UI.createEle("div"),
                startBtn = UI.createEle("button"),
                delBtn = UI.createEle("button");

            delBtn.innerHTML = "Delete All Storage";
            delBtn.className = "startPageBtn";
            delBtn.onclick = UI.deleteAllStorage;

            startBtn.innerHTML = "Start New";
            startBtn.className = "startPageBtn";
            startBtn.onclick = UI.startProgram(myFrame, startBtn, delBtn);

            myFrame.className = "myFrame";

            myFrame.appendChild(startBtn);
            myFrame.appendChild(delBtn);

            dvContain.appendChild(myFrame);
        },
        startProgram: (myFrame, startBtn, delBtn) => {
            return () => {
                var playerSetupPage = UI.createEle("div"), elems;

                elems = "<span id='setupX' class='xBtns'>X</span>";
                elems += "<h2>Setup Your Company</h2>";
                elems += "<p><input type='text' placeholder='Site Name' class='setupItems' /></p>";
                elems += "<p><input type='text' placeholder='Owner Name' class='setupItems' /></p>";
                elems += "<p><input id='rd1' type='radio' checked class='setupItems' name='rds' /><label for='rd1'>♂</label>";
                elems += "<input id='rd2' type='radio' unchecked class='setupItems' name='rds' /><label for='rd2'>♀</label>";
                elems += "<span id='genderSpn'>Male</span></p>";
                elems += "<p><div id='playerBox'>BOX</div></p>";
                elems += "<p><input type='button' value='⭕' class='setupConfirm' /></p>";

                playerSetupPage.className = "playerSetupPage";
                playerSetupPage.innerHTML = elems;

                startBtn.remove();
                delBtn.remove();
                myFrame.appendChild(playerSetupPage);

                setTimeout(() => {
                    playerSetupPage.className = "playerSetupPage_full";
                    var setupItems = UI.bySelAll(".setupItems");
                    var setupConfirm = UI.bySel(".setupConfirm");
                    var genderSpn = UI.bySel("#genderSpn");
                    var setupX = UI.bySel("#setupX");


                    setupX.onclick = UI.goHome(playerSetupPage, myFrame);

                    for (var i = 0; i < setupItems.length; i++) {
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
                playerSetupPage = UI.bySel(".playerSetupPage_full"),
                myFrame = playerSetupPage.parentNode;

            setTimeout(() => {
                playerSetupPage.className = "playerSetupPage";
                setTimeout(() => {
                    playerSetupPage.remove();
                    UI.beginGameSession(myFrame, ud);
                }, 1000);
            }, 50);
            
        },
        beginGameSession: (myFrame, ud) => {

            if (ud) {
                var uuu = JSON.parse(ud);
            }
            var table = UI.createEle("div");

            table.className = "theTable";
            for (var i = 1; i < 10; i++) {
                var elems = UI.createEle("div");

                elems.id = "elem_" + i + "";
                elems.className = "playerItems";
                //elems.innerHTML = "" + i + "";
                //do css
                table.appendChild(elems);
            }
            
            myFrame.appendChild(table);
            
            setTimeout(() => {
                var playerItems = UI.bySelAll(".playerItems");
                playerItems[0].innerHTML = uuu.siteName;
                playerItems[1].innerHTML = uuu.userName;
                playerItems[2].innerHTML = "<span>Level</span> <span>" + uuu.lvl + "</span>";
                playerItems[3].innerHTML = "<span>Humor</span> <span>" + uuu.hum + "</span>";
                playerItems[4].innerHTML = "<span>Inteligence</span> <span>" + uuu.int + "</span>";
                playerItems[5].innerHTML = "<span>Creativity</span> <span>" + uuu.cre + "</span>";
                playerItems[6].innerHTML = "<span>Luck</span> <span>" + uuu.luck + "</span>";
                playerItems[7].innerHTML = "<span>Charisma</span> <span>" + uuu.chr + "</span>";
                playerItems[8].innerHTML = "<span>Speed</span> <span>" + uuu.spd + "</span>";
                table.className = "theTable_full";
            }, 1000);
        },
        goHome: (playerSetupPage, myFrame) => {
            return () => {
                playerSetupPage.className = "playerSetupPage";
                
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
