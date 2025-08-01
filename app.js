{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww34000\viewh21380\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // RUN ME - 1v1 Running Challenge App (Basic Demo Logic)\
console.log('RUN ME app loaded!');\
\
document.addEventListener('DOMContentLoaded', function() \{\
    // Show welcome screen\
    showScreen('welcome');\
    setupAllButtons();\
    updateBetCalculation();\
\});\
\
function setupAllButtons() \{\
    // Demo mode button\
    const demoBtn = document.getElementById('demo-mode-btn');\
    if (demoBtn) \{\
        demoBtn.onclick = function() \{\
            const name = document.getElementById('fighter-name').value.trim();\
            if (!name) \{\
                alert('Enter your fighter name first!');\
                return;\
            \}\
            localStorage.setItem('runme_user', JSON.stringify(\{\
                name: name,\
                userId: 'demo_user_' + Date.now()\
            \}));\
            showScreen('main-menu');\
            document.getElementById('user-name').textContent = name;\
            alert('Demo mode activated!');\
        \};\
    \}\
\
    // Wallet button (placeholder)\
    const walletBtn = document.getElementById('connect-wallet-btn');\
    if (walletBtn) \{\
        walletBtn.onclick = function() \{\
            const name = document.getElementById('fighter-name').value.trim();\
            if (!name) \{\
                alert('Enter your fighter name first!');\
                return;\
            \}\
            alert('Wallet connection is a demo in this version.');\
            localStorage.setItem('runme_user', JSON.stringify(\{\
                name: name,\
                userId: 'user_' + Date.now(),\
                walletAddress: 'demo_wallet'\
            \}));\
            showScreen('main-menu');\
            document.getElementById('user-name').textContent = name;\
        \};\
    \}\
\
    // GPS button (placeholder)\
    const gpsBtn = document.getElementById('connect-gps-btn');\
    if (gpsBtn) \{\
        gpsBtn.onclick = function() \{\
            alert('GPS connection is a demo in this version.');\
        \};\
    \}\
\
    // Distance buttons\
    document.querySelectorAll('.distance-btn').forEach(function(btn) \{\
        btn.onclick = function() \{\
            document.querySelectorAll('.distance-btn').forEach(b => b.classList.remove('selected'));\
            btn.classList.add('selected');\
        \};\
    \});\
\
    // Betting amount input\
    const betInput = document.getElementById('bet-amount');\
    if (betInput) \{\
        betInput.oninput = function() \{\
            updateBetCalculation();\
        \};\
    \}\
\
    // Currency select\
    const currencySelect = document.getElementById('bet-currency');\
    if (currencySelect) \{\
        currencySelect.onchange = function() \{\
            updateBetCalculation();\
        \};\
    \}\
\}\
\
function showScreen(screenName) \{\
    document.querySelectorAll('.screen').forEach(function(screen) \{\
        screen.classList.add('hidden');\
    \});\
    const targetScreen = document.getElementById(screenName + '-screen');\
    if (targetScreen) \{\
        targetScreen.classList.remove('hidden');\
    \}\
    if (screenName === 'battle') \{\
        loadBattleRecord();\
    \}\
\}\
\
function loadBattleRecord() \{\
    const battleContent = document.getElementById('battle-content');\
    if (battleContent) \{\
        battleContent.innerHTML = `\
            <div class="fighter-card">\
                <div class="fighter-name">DEMO FIGHTER</div>\
                <div class="fighter-status">BATTLE READY</div>\
                <div class="record-main">\
                    <span class="record-wins">5</span>\
                    <span class="record-separator">-</span>\
                    <span class="record-losses">2</span>\
                </div>\
                <div class="record-label">WINS - LOSSES</div>\
                <div class="battle-stats">\
                    <div class="battle-stat">\
                        <span class="battle-stat-value">71%</span>\
                        <span class="battle-stat-label">WIN RATE</span>\
                    </div>\
                    <div class="battle-stat">\
                        <span class="battle-stat-value">3</span>\
                        <span class="battle-stat-label">CURRENT STREAK</span>\
                    </div>\
                    <div class="battle-stat">\
                        <span class="battle-stat-value">4</span>\
                        <span class="battle-stat-label">BEST STREAK</span>\
                    </div>\
                    <div class="battle-stat">\
                        <span class="battle-stat-value">7</span>\
                        <span class="battle-stat-label">TOTAL BATTLES</span>\
                    </div>\
                </div>\
            </div>\
        `;\
    \}\
\}\
\
function updateBetCalculation() \{\
    const betAmount = parseFloat(document.getElementById('bet-amount').value) || 0;\
    const platformFee = 0.10;\
    const platformFeeAmount = betAmount * platformFee;\
    const winnerAmount = (betAmount * 2) - (platformFeeAmount * 2);\
\
    const yourBetElement = document.getElementById('your-bet');\
    const platformFeeElement = document.getElementById('platform-fee');\
    const winnerAmountElement = document.getElementById('winner-amount');\
\
    if (yourBetElement) yourBetElement.textContent = `$$\{betAmount.toFixed(2)\}`;\
    if (platformFeeElement) platformFeeElement.textContent = `$$\{platformFeeAmount.toFixed(2)\}`;\
    if (winnerAmountElement) winnerAmountElement.textContent = `$$\{winnerAmount.toFixed(2)\}`;\
\}\
\
// WhatsApp challenge\
window.app = \{\
    showScreen: showScreen,\
    showProfile: function() \{\
        alert('Profile feature coming soon!');\
    \},\
    sendWhatsAppChallenge: function() \{\
        const distance = document.querySelector('.distance-btn.selected')?.dataset.distance || '1000';\
        const opponentName = document.getElementById('opponent-name').value.trim();\
        const opponentWhatsApp = document.getElementById('opponent-whatsapp').value.trim();\
        const betAmount = parseFloat(document.getElementById('bet-amount').value) || 10;\
        const betCurrency = document.getElementById('bet-currency').value;\
\
        if (!opponentName || !opponentWhatsApp) \{\
            alert('Please fill in opponent details!');\
            return;\
        \}\
\
        if (betAmount < 1 || betAmount > 100) \{\
            alert('Bet amount must be between $1 and $100!');\
            return;\
        \}\
\
        const platformFee = 0.10;\
        const platformFeeAmount = betAmount * platformFee;\
        const winnerAmount = (betAmount * 2) - (platformFeeAmount * 2);\
\
        let phoneNumber = opponentWhatsApp.replace(/\\D/g, '');\
        if (phoneNumber.length === 10) \{\
            phoneNumber = '1' + phoneNumber;\
        \}\
\
        const message = `\uc0\u55358 \u56650  RUN ME CHALLENGE! \u55358 \u56650 \
\
DEMO FIGHTER has challenged you to a $\{distance >= 1000 ? distance/1000 + 'K' : distance + 'm'\} race!\
\
\uc0\u55357 \u56496  BETTING: $$\{betAmount\} $\{betCurrency\}\
\uc0\u55356 \u57286  WINNER GETS: $$\{winnerAmount.toFixed(2)\}\
\uc0\u55357 \u56504  PLATFORM FEE: $$\{platformFeeAmount.toFixed(2)\}\
\
Are you ready to prove yourself?\
\
\uc0\u55356 \u57283 \u8205 \u9794 \u65039  Ready to RUN ME? \u55356 \u57283 \u8205 \u9792 \u65039 \
\
#RunMeChallenge #1v1Running`;\
\
        const whatsappUrl = `https://wa.me/$\{phoneNumber\}?text=$\{encodeURIComponent(message)\}`;\
        window.open(whatsappUrl, '_blank');\
\
        alert('Challenge sent via WhatsApp!');\
        showScreen('main-menu');\
    \}\
\};}
