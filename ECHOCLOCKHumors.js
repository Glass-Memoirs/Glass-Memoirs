/*
 OK REDOING THIS COMMENTING BECAUSE I LOST IT AGAIN
 Credits:
 - EE for ideas, playtesting, and also making the undithered gif for entropy
 - Lustre for making the dithered version of the fractal gif
 - Sola for making the monochrome eye for Entropy's action
 - Narri, Kuvi, and Adr for judging my code
 - Adenator for the code for making the status pool because i was probably not gonna figure that out at all
 SECTIONS:
 1. Dialogue changing
 2. CSS
 3. Humors
 4. Augments
 5. Combat Modifiers
 6. Status Effects
 7. Combat Actions
 8. Merchant Code

 TO DO:
 Make Entropy's action: ACTION::REACT
 > On Applied Negative Status effect, Use Random Action
 Make Entropy's Fated:
 > yknow i dont know what to make this, definately something status related
*/

//Dialogue changing
document.addEventListener("readystatechange", (event) => {
	if(document.readyState == 'complete') {
		env.dialogues["dreammod"] = generateDialogueObject(`
loop
    basterminal
        ALTERED
        TEXEC::\`STARTING TENSION::'\${check("e3a2_tension") || 1}'\`
            AUTOADVANCE::
        TEXEC::\`STARTING HUMORS::'\${check("e3a2_newcomp") || "normal"}'\`
            AUTOADVANCE::
        TEXEC::\`STARTING SFER::'\${check("e3a2_sfer") || "0"}'\`
            AUTOADVANCE::
        TEXEC::\`FISH SPAWN RATE::'\${check("e3a2_fishchance") ? \`\${Number(check("e3a2_fishchance")) * 100}%\`: '10%'}'\`
            AUTOADVANCE::
            SHOWIF::"e3a2__fishy"

    RESPOBJ::basterminalResp

start
    sourceless
        the terminal displays various controls and settings for the dream.
    
    basterminal
        hi :b
        CURRENT SETTINGS
        TEXEC::\`STARTING TENSION::'\${check("e3a2_tension") || 1}'\`
        TEXEC::\`STARTING HUMORS::'\${check("e3a2_newcomp") || "normal"}'\`
        TEXEC::\`STARTING SFER::'\${check("e3a2_sfer") || "0"}'\`
        TEXEC::\`FISH SPAWN RATE::'\${check("e3a2_fishchance") ? \`\${Number(check("e3a2_fishchance")) * 100}%\`: '10%'}'\`
            SHOWIF::"e3a2__fishy"
    
    RESPOBJ::basterminalResp

tension
    basterminal
        select starting tension
        1 is default
    
    RESPONSES::self
        1<+>loop
            EXEC::change("e3a2_tension", 1)
            HIDEREAD::
        2<+>loop
            EXEC::change("e3a2_tension", 2)
            HIDEREAD::
        3<+>loop
            EXEC::change("e3a2_tension", 3)
            HIDEREAD::
        4<+>loop
            EXEC::change("e3a2_tension", 4)
            HIDEREAD::
        5<+>loop
            EXEC::change("e3a2_tension", 5)
            HIDEREAD::
        6<+>loop
            EXEC::change("e3a2_tension", 6)
            HIDEREAD::

humors
    basterminal
        select starting <span class="code">humor</span> set
        normal is default
    
    RESPONSES::self
        normal<+>loop
            EXEC::change("e3a2_newcomp", "normal")
            HIDEREAD::
        abundant<+>loop
            EXEC::change("e3a2_newcomp", "abundant")
            HIDEREAD::
        too many<+>loop
            EXEC::change("e3a2_newcomp", "too many")
            HIDEREAD::
        claws<+>loop
            EXEC::change("e3a2_newcomp", "claws")
            HIDEREAD::
        eyes<+>loop
            EXEC::change("e3a2_newcomp", "eyes")
            HIDEREAD::
        ichor<+>loop
            EXEC::change("e3a2_newcomp", "ichor")
            HIDEREAD::
        light<+>loop
            EXEC::change("e3a2_newcomp", "light")
            HIDEREAD::
        bone<+>loop
            EXEC::change("e3a2_newcomp", "bone")
            HIDEREAD::
        entropy<+>loop
            EXEC::change("e3a2_newcomp", "entropy")
            HIDEREAD::

fish
    basterminal
        select fish spawn rate
        10% is default
    
    RESPONSES::self
        normal (10%)<+>loop
            EXEC::change("e3a2_fishchance", "0.1")
            HIDEREAD::
        foolish (25%)<+>loop
            EXEC::change("e3a2_fishchance", "0.25")
            HIDEREAD::
        likely (50%)<+>loop
            EXEC::change("e3a2_fishchance", "0.5")
            HIDEREAD::
        guaranteed (100%)<+>loop
            EXEC::change("e3a2_fishchance", "1")
            HIDEREAD::

sfer
    basterminal
        select starting sfer
        none is default
    
    RESPONSES::self
        none (0)<+>loop
            EXEC::change("e3a2_sfer", "DELETE")
            HIDEREAD::

        some (20)<+>loop
            EXEC::change("e3a2_sfer", 20)
            HIDEREAD::

        abundant(40)<+>loop
            EXEC::change("e3a2_sfer", 40)
            HIDEREAD::

        a lot (99)<+>loop
            EXEC::change("e3a2_sfer", 99)
            HIDEREAD::
`)
	}
} ) ;

document.addEventListener("readystatechange", (event) => {
	if(document.readyState == 'complete'){
		switch(check("e3a2_newcomp")) {
		case "too many":
			page.flags.components = {
				ichor: 30,
				claws: 30,
				light: 30,
				bone: 30,
				eyes: 30,
				entropy: 30,
			}
			
			page.party[0].components["primary"] = "claws"
			page.party[0].components["secondary"] = "claws"
			page.party[0].components["utility"] = "eyes"

			page.party[1].components["primary"] = "light"
			page.party[1].components["secondary"] = "eyes"
			page.party[1].components["utility"] = "bone"

			page.party[2].components["primary"] = "eyes"
			page.party[2].components["secondary"] = "ichor"
			page.party[2].components["utility"] = "light"
				break

		case "abundant":
			page.flags.components = {
				ichor: 3,
				claws: 3,
				light: 3,
				bone: 3,
				eyes: 3,
				entropy: 3,
			}
			
			page.party[0].components["primary"] = "claws"
			page.party[0].components["secondary"] = "claws"
			page.party[0].components["utility"] = "eyes"

			page.party[1].components["primary"] = "light"
			page.party[1].components["secondary"] = "eyes"
			page.party[1].components["utility"] = "bone"

			page.party[2].components["primary"] = "eyes"
			page.party[2].components["secondary"] = "ichor"
			page.party[2].components["utility"] = "light"
				break

		case "entropy":
			page.flags.components = { entropy: 12 }

			page.party.forEach(member=>{
				member.components["primary"] = "entropy"
				member.components["secondary"] = "entropy"
				member.components["utility"] = "entropy"
			})
		}
	}
});

//CSS
content.insertAdjacentHTML('beforeend', `<style>
/* for making player cards not overflow offscreen */
#ally-team .actor {
    background-color: var(--dark-color);
    margin-top: 50px;
}

#ally-team {
    bottom: 5vh;
    flex-wrap: wrap;
    z-index: 29;
}

#crittaresult, #crittaresult * {
    transition: transform 2s ease-in-out, opacity 2s ease-in-out;
    text-align: center;
    z-index: 30;
}


/* humor styling */
[component="entropy"] {
    --background: url(https://glass-memoirs.github.io/Glass-Memoirs/ENTROPYHUMORundithered.gif);
    --organelle-background: url(https://glass-memoirs.github.io/Glass-Memoirs/ENTROPYHUMORundithered.gif);    
    --background-small:  url(https://glass-memoirs.github.io/Glass-Memoirs/ENTROPYHUMORundithered.gif);
    --background-size: auto;
    --background-position: center;
    --background-color: var(--dark-color);
    --accent-color: var(--bright-color);
    --font-color: var(--neutral-color);
}
</style>`);
//HUMORS
env.COMBAT_COMPONENTS.entropy = {
     name: "Entropy",
     slug: "entropy",
     description: "'repetition and chaos'",
     help: "'charge';'balance';'surges'",

     primary: { //damage scales by positive effects on user
          alterations: [["primary", "momentum"]],     

          stats: {
               maxhp: 4
          },
     },

     secondary: { //Removes status effects from both you and the enemy
          alterations: [["secondary", "level_statuses"]],
          stats: {
               maxhp: 4
          }
     },

     utility: { //randomly strike enemies with attack, has chance to keep going
          alterations: [["evade", "wild_frenzy"]],
          stats: {
               maxhp: 4
          }
     },
     combatModifiers: ["entropy_eternal", "entropy_eyes", "entropy_clock", "entropy_heat"]
}

//AUGMENTS
env.ACTOR_AUGMENTS.generic.third_law = {
     slug: "third_law",
     name: "3rd Law",
     image: "/img/sprites/combat/augs/cripple.gif",
     description: "'barrel into foes with great energy';'half beneficial effects for power'",
     alterations: [["momentum", "player_law"]],
     component: ["primary", "entropy"],
     cost: 2
}

env.ACTOR_AUGMENTS.generic.rig_field = {
     slug: "rig_field",
     name: "Rig Field",
     image: "/img/sprites/combat/augs/barrier.gif",
     description: "'rig the fight in your favour';'steal beneficial statuses from the foe'",
     alterations: [["level_statuses", "player_rig"]],
     component: ["secondary", "entropy"],
     cost: 2
}

env.ACTOR_AUGMENTS.generic.exp_overload = {
     slug: "exp_overload",
     name: "Exponential Overload",
     image: "/img/sprites/combat/augs/cripple.gif",
     description: "'focus movement into quick planned strikes';'improves striking'",
     alterations: [["wild_frenzy", "player_overload"]],
     component: ["utility", "entropy"],
     cost: 2
}

//COMBAT MODIFIERS
env.MODIFIERS.entropy_eternal = {
	name: "Eternal Decay",
	getHelp: ()=> { return env.STATUS_EFFECTS.entropy_eternal.help },
	alterations: {
		all: [ ["STATUS", "entropy_eternal"] ]
	}
}

env.MODIFIERS.entropy_eyes = {
	name: "Shattered Eyes",
	getHelp: ()=> { return env.STATUS_EFFECTS.entropy_eyes.help },
	alterations: {
		all: [ ["STATUS", "entropy_eyes"] ]
	}
}

env.MODIFIERS.entropy_clock = {
     name: "Broken Clock",
     getHelp: ()=> {return env.STATUS_EFFECTS.entropy_clock.help},
     alterations: {
          all: [["STATUS", "entropy_clock"]]
     }
}

env.MODIFIERS.entropy_heat ={
     name: "Heat Death",
     getHelp: ()=> {return env.STATUS_EFFECTS.entropy_heat.help},
     alterations: {
          all: [["STATUS", "entropy_heat"]]
     }
}
//STATUS EFFECTS
env.STATUS_EFFECTS.entropy_eternal = {//THIS WAS THE HARDEST
	slug: "entropy_eternal",
	name: "Eternal Decay",
	passive: "modifier",
	beneficial: false,
	icon: "/img/sprites/combat/passives/light_glee.gif",
	impulse: {type: "common", component: "entropy"},
	events: {
        
        onTurn: function() {
	    	target = this.status.affecting
	    	let statusPool = []
		for (let i in env.STATUS_EFFECTS) {
        	     let statusData = env.STATUS_EFFECTS[i]
		     let usable = true
               //prevent durationless statuses from appearing (and by extend, other passives)
            	if(statusData.infinite) {usable = false}
            	//OKAY NEVERMIND SOME PASSES DON'T HAVE INFINITE
            	if(statusData.passive) {usable = false}
            	//APPARENTLY IT'S POSSIBLE TO GIVE GLOBAL MODIFIERS?????
            	if(i.includes("global_")) {usable = false}
				//prevent misalign statuses from appearing, despite their duration existence
            	if(i == "misalign_weaken" || i == "misalign_stun" || i == "realign" || i == "realign_stun") {usable = false}
            	//and imperfect reset. i do not know how terrible that will end up.
            	if(i == "imperfect_reset") {usable = false}
            	//redirection probably needs an origin, so exclude it
            	if(i == "redirection") {usable = false}

		     if(i == "entropy_eternal") {usable = false}
          
               //console.log(i, usable)
               if(usable) statusPool.push(i)
          }
	     let validEffects = []
	     target.statusEffects.forEach((status, i) => {
               //console.log(status)
               if((!status.infinite || !status.passive) && (statusPool.includes(status.slug))) {
                    validEffects.push(status.slug)
               }
          })
	     console.log(validEffects)
               if(validEffects.length) validEffects.forEach((Replace) => {
                    let selectedStatus = statusPool[Math.floor(Math.random()*statusPool.length)]
                    //console.log(selectedStatus)
                    let chance = 0.2
                    let extra = 0
				//console.log(Replace)
                    if(Math.random() < chance) {

                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        arbitraryString: "DECAYED!",
                        isGood: false
                    })
		
		          if (hasStatus(target, Replace)) {
		    	          addStatus({target: target, origin: false, status: selectedStatus, length: Math.floor(hasStatus(target, Replace)), noReact: true})
			          removeStatus(target, Replace)
		         }     
               }
            })
        }
    },


     help: `most status effects have a 20% chance to become any other effects`
},

env.STATUS_EFFECTS.entropy_eyes = {
	slug: "entropy_eyes",
	name: "Shattered Eyes",
     passive: "modifier",
	beneficial: false,
     icon: "/img/sprites/combat/passives/light_dark.gif",
	events: {

		onTurn: function(){
			console.log("nothing here yet!")
               target = this.status.affecting
               let statusPool = []
		     for (let i in env.STATUS_EFFECTS) {
        	          let statusData = env.STATUS_EFFECTS[i]
		          let usable = true
                 	if(statusData.infinite) {usable = false}
                 	if(statusData.passive) {usable = false}
                 	if(i.includes("global_")) {usable = false}
                	if(i == "misalign_weaken" || i == "misalign_stun" || i == "realign" || i == "realign_stun") {usable = false}
            	     if(i == "imperfect_reset") {usable = false}
                 	if(i == "redirection") {usable = false}
		          if(i == "entropy_eternal") {usable = false}
                    //console.log(i, usable)
                    if(usable) statusPool.push(i)
               }
               let AllTargets = []
               env.rpg.enemyTeam.members.forEach((target) => {
                    if (target => target.state != "dead" && target.state != "lastStand") {
                         AllTargets.push(target)
                    }
               })
               env.rpg.allyTeam.members.forEach((target)=> {
                    if (target => target.state != "dead" && target.state != "lastStand") {
                         AllTargets.push(target)
                    }
               })
               let TakableEffects = []
               target.statusEffects.forEach((Deciding) => {
                    if((!Deciding.infinite || !Deciding.passive) && (statusPool.includes(Deciding.slug))) {
                         TakableEffects.push(Deciding.slug)
                    }
               })
               if(TakableEffects.length) for (let i = 0; i <= Math.floor(Math.random()*TakableEffects.length); i++) {
                    let Chance = 0.4
                    if (Math.random() < Chance) {
                         sendFloater({
                              target: this.status.affecting,
                              type: "arbitrary",
                              arbitraryString: "REFRACTED!",
                              isGood: false
                         })
                         let TakingStat = TakableEffects.sample()
                         let SendingTo = AllTargets.sample({noRepeat: true})
                         if (hasStatus(target, TakingStat)) {
                              addStatus({target: SendingTo, status: TakingStat, length: Math.floor(hasStatus(target, TakingStat))})
                              removeStatus(target, TakingStat)
                         }
                    }
               }
		}
	},
		
	help: `Effects have a 40% chance of being moved to another actor`
},

env.STATUS_EFFECTS.entropy_clock = {
     slug: "entropy_clock",
     name: "Broken Clock",
     passive: true,
     beneficial: false,
     icon: "/img/sprites/combat/passives/claws_infection.gif",
     events: {
          onTurn: function() {
               reactDialogue(this.status.affecting, 'rot');
               combatHit(this.status.affecting, {amt: 2, autohit: true, redirectable: false, runEvents: false});
               play('status', 0.75, 0.5);
           },
     },
     help: "Each turn loose 2hp"
},

env.STATUS_EFFECTS.entropy_heat = {
     slug: "entropy_heat",
     name: "Heat Death",
     passive: true,
     beneficial: true,
     icon: "",
     events: {
          onBeforeAction: function(context) {
               if(!context.settings.action.type.includes("target")) return;
               let Chance = 0.23
               // alter action maybe
               if(Math.random() < Chance) {

                   context.settings.action = env.ACTIONS["entropy_burnout"]
                   let subject = context.settings.user

                   sendFloater({
                       target: subject,
                       type: "arbitrary",
                       arbitraryString: "SPARKING",
                       isGood: false,
                       size: 2,
                   })
               }
           },
     },
     help: 'Attacks have a 23% chance to become Burnout'
},

env.STATUS_EFFECTS.entropy_reaction = {
     slug: "entropy_reaction",
     name: "ACTION:: REACT",
     passive: true,
     beneficial: true,
     icon: "https://glass-memoirs.github.io/Glass-Memoirs/eyew.gif",
     impulse: {type: "action", component: "entropy"},
     events: {
          onCrit: function({subject, target}) {
               let modifierPool = []
		     for (let i in env.STATUS_EFFECTS) {
        	          let statusData = env.STATUS_EFFECTS[i]
		          let usable = false
                    if(statusData.passive) {usable = true}
                    if(statusData.infinite || (statusData.slug != "windup")) {usable = true}
                 	if(i.includes("global_")||i.includes("malware_")||i.includes("fish_")) {usable = false}
                	if(i == "misalign_weaken" || i == "misalign_stun" || i == "realign" || i == "realign_stun") {usable = false}
            	     if(i == "imperfect_reset") {usable = false}
                 	if(i == "redirection" || i == "ethereal" || i == "immobile" || i == "conjoined" || i == "permanent_hp") {usable = false}
                    console.log(i, usable)
                    if(usable) modifierPool.push(i)
               }
               console.log(modifierPool)
               let targetModifiers = []
               for (let i in subject.statusEffects) {
                    let status = subject.statusEffects[i]
                    console.log(status)
                    if((status.infinite || status.passive || !i.includes("global_")) && (modifierPool.includes(status.slug))) {
                         targetModifiers.push(status.slug)
                    }
               }
               console.log(targetModifiers)
               if (targetModifiers.length) for(let i = 0; i<1; i++) {
                    let Chance = 0.2
                    if (Math.random() < Chance) {
		        sendFloater({
                            target: subject,
                            type: "arbitrary",
                            arbitraryString: "DRAINED!",
                            isGood: false
                        })
                         let KillModif = targetModifiers.sample()
                         removeStatus(subject, KillModif, {forceRemoveStatus: true})
                    }
               }
           }
       },
       help: '20% chance to remove random status or impulse'
}



env.STATUS_EFFECTS.exp_over = { //This was what spurred this entire idea. The interaction between Bazruka and Wild Surge was interesting
     slug: "exp_over",
     name: "Exponential Overload",
     beneficial: true,
     infinite: true,
     events: {
          onTurn: function() { 
                reactDialogue(this.status.affecting, 'surge') 
                delete this.status.justGotSurge
            },

          onAction: function({user, action, target, beingUsedAsync}) {
               if(
                   this.status.justGotSurge || 
                   beingUsedAsync || 
                   ["incoherent_", "steer", "floor", "windup", "intrusive"].some(slugpart => action.slug.includes(slugpart)) ||
                   !action.type.includes("target") ||
                   (!action.beneficial && target.team.name == "ally") ||
                   (action.beneficial && target.team.name == "enemy")
               ) return;


               setTimeout(()=>{
                    sendFloater({
                        target: user,
                        type: "arbitrary",
                        arbitraryString: "EXPONENTIAL SURGE!",
                        size: 1.5,
                    })

                    readoutAdd({
                        message: `${user.name} enters a deeply focused flurry! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })

                    env.GENERIC_ACTIONS.teamWave({
                        team: target.team,
                        exec: (actor, i) => {
                            if(actor == target) return; // we skip the original target
                            env.GENERIC_ACTIONS.teamWave({
                                 team: target.team,
                                 exec: (actor, i) => {
                                     if(actor == target) return; // we skip the original target
                                     useAction(user, action, actor, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "wild surge"})
                                 }
                            })
                        }
                    })

                }, 500)

                removeStatus(this.status.affecting, "exp_over")
		addStatus({target:user, status: 'stun', length: 2, noReact: true})
		addStatus({target:user, status: 'vulnerable', length: 3, noReact: true})
            },

                onCreated: function({statusObj}) {
                if(statusObj.slug == this.status.slug) this.status.justGotSurge = true
            },
        },
        help: "on next active targeted action, gain 1T:STUN, and use across the entire target team\nif beneficial, action used on all allies\nif offensive, action used on all foes"
},

env.STATUS_EFFECTS.burnout = {
     slug: "burnout",
     name: "Burnout",
     beneficial: false,
     events:{
          onCrit: function({subject, attack, originalEventTarget}) {
               removeStatus(this.status.affecting, 'burnout',{runEvents: false})

               sendFloater({
                    target: this.status.affecting,
                    type: "arbitrary",
                    arbitraryString: "DOUSED!",
                    size: 1,
               })

               readoutAdd({
                    message: `${this.status.affecting.name} puts out the flame on their enegrgy`, 
                    name: "sourceless", 
                    type: "sourceless combat minordetail",
                    show: false,
                    sfx: false
               })               
          },
          onTurn: function({target}) {
               if (Math.floor(hasStatus(this.status.affecting, "burnout")) <= 2){
                    addStatus({target: this.status.affecting, status: "hotpocket", length: 2})
               }
          },
       },
     help: 'Once status runs out, Explode.'
},

env.STATUS_EFFECTS.hotpocket = {
     slug: "hotpocket",
     name: "Immanent Death",
     beneficial: false,
     events: {
          onTurn: function() {
               combatHit(this.status.affecting, {amt: 1000, autohit: true, redirectable: false})
          }
     },
     help: "Explode! :}"
}

//COMBAT ACTIONS
env.ACTIONS.momentum = { //couldnt figure out how to make this thing actually multiply damage by the amount of stat effects so i made it loop
     slug: "momentum",
     name: "Momentum",
     type: 'target',
     desc: "'redirect beneficial effects into power';'removes them once the hit connects'",
     anim: "basic-attack",
     help: "'100% -2HP + (XT:REGEN/FOCUS)\nSELF::-REGEN/FOCUS'",
     usage: {
          act: "%USER CHANNELS ENERGY INTO A SPRINT",
          crit: "%TARGET GETS KNOCKED OVER",
          hit: "%TARGET GETS SLAMMED INTO",
          miss: "%TARGET SIDESTEPS"
     },
     accuracy: 1,
     crit: 0.1,
     amt: 2,
     exec: function(user, target) {
          let action = this
          //console.log(hasStatus(user, 'focused'))

          //The looping part
          for (let i = 1; i <= (Math.floor(hasStatus(user, 'focused')) + Math.floor(hasStatus(user, 'regen'))); i++) {
               env.GENERIC_ACTIONS.singleTarget({
                    action,
                    user,
                    target: target,
                    critExec: ({target}) => {
	  	               addStatus({target: target, status: 'stun', length: 1})
                    }
               })
          }
          if(hasStatus(user, 'focused')) removeStatus(user, "focused")
          if(hasStatus(user, 'focused')) removeStatus(user, "regen")
     }
},

env.ACTIONS.player_law = { //Funky little move, had to change it up just like momentum.
     slug: "player_law",
     name: "3rd Law",
     type: 'target',
     desc: "'barrel towards foes';'chance to stun and apply vulnerable'",
     anim: "basic-attack",
     help: "'100% -2HP * (XT:REGEN+FOCUS) 15%C +2T STUN +3T VULNERABLE\nSELF:: #T/2 REGEN/FOCUS/EVASION'",
     usage: {
          act: "%USER CHANNELS ENERGY INTO A SPRINT",
          crit: "%TARGET GETS KNOCKED OVER",
          hit: "%TARGET GETS SLAMMED INTO",
          miss: "%TARGET SIDESTEPS"
     },
     accuracy: 1,
     crit: 0.15,
     amt: 2,
     exec: function(user, target) {
          let action = this
          for (let i = 1; i <= (Math.floor(hasStatus(user, 'focused')) + Math.floor(hasStatus(user, 'regen')) + Math.floor(hasStatus(user, 'evasion'))); i++) {
               env.GENERIC_ACTIONS.singleTarget({
                    action: action, user,
                    target: target,
                    critExec: ({target}) => {
                         addStatus({target: target, status: 'stun', length: 1})
                         addStatus({target: target, status: 'vulnerable', length: 2})
                    }
               })
               
          }
          if (hasStatus(user, 'focused')) {
               let half = 0 - Math.floor(hasStatus(user, 'focused') / 2)
               addStatus({target: user, status: "focused", length: half, noReact: true})
          }
          if (hasStatus(user, 'regen')) {          
               let half = 0 - Math.floor(hasStatus(user, "regen") / 2)
               addStatus({target: user, status: "regen", length: half, noReact: true})
          }
	     if (hasStatus(user, 'evasion')) {
	       let half = 0 - Math.floor(hasStatus(user, 'evasion') / 2)
	       addStatus({target: user, status: "evasion", length: half, noReact: true})
	     }
     }
},


env.ACTIONS.level_statuses ={ //this would not deal damage for me at all so i made it deal no damage, also turns out windup doesnt break anything if its removed!
     slug: "level_statuses",
     name: "Level",
     type: 'target',
     desc: "'collapse beyond both yourself and the foe';'remove all statuses'",
     anim: "basic-attack",
     help: "80% REMOVE MOST STATUS EFFECTS, 15%C REMOVE WINDUP",
     usage: {
          act: "%USER REACHES OUT",
          crit: "%USER AND %TARGET FEEL SOMETHING GET TORN AWAY",
          hit: "%TARGET GETS CLAWED",
          miss: "%TARGET SWATS %USER AWAY"
     },
     accuracy: 0.8,
     crit: 0.15,
     amt: 0,
     exec: function(user, target) {
          let statusPool = []
          for (let i in env.STATUS_EFFECTS) {
               let statusData = env.STATUS_EFFECTS[i]
               let usable = true
               //prevent durationless statuses from appearing (and by extend, other passives)
               if(statusData.infinite && (statusData.slug != "windup")) {usable = false}
               //OKAY NEVERMIND SOME PASSES DON'T HAVE INFINITE
               if(statusData.passive) {usable = false}
               //APPARENTLY IT'S POSSIBLE TO GIVE GLOBAL MODIFIERS?????
               if(i.includes("global_")) {usable = false}
               //prevent misalign statuses from appearing, despite their duration existence
               if(i == "misalign_weaken" || i == "misalign_stun" || i == "realign" || i == "realign_stun") {usable = false}
               //and imperfect reset. i do not know how terrible that will end up.
               if(i == "imperfect_reset") {usable = false}
               //redirection probably needs an origin, so exclude it
               if(i == "redirection") {usable = false}

               if(i == "entropy_eternal") {usable = false}

               //console.log(i, usable)
               if(usable) statusPool.push(i)
          }
          let targetEffects = []
          target.statusEffects.forEach((status, i) => {
               //console.log(status)
               if((!status.infinite || !status.passive || !i.includes("global_")) && (statusPool.includes(status.slug))) {
                    targetEffects.push(status.slug)
               }
          })
          let userEffects = []
          user.statusEffects.forEach((status, i) => {
              //console.log(status)
               if((!status.infinite || !status.passive || !i.includes("global_")) && (statusPool.includes(status.slug) && (status.slug != "windup"))) {
                    userEffects.push(status.slug)
               }
          })
          targetEffects.forEach((status) => {
               if(status != "windup") removeStatus(target, status)
          })
          userEffects.forEach((status) => {
               removeStatus(user, status)
          })
          critExec: { //DOnt believe its lies this works jsut fine
               if (targetEffects.includes("windup")) {
                    sendFloater({
                        target: user,
                        type: "arbitrary",
                        arbitraryString: "LMAO",
                        size: 1.5,
                    })

                    readoutAdd({
                        message: `${target.name} forgot what it was doing.`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                    removeStatus(target, "windup")
               }
          }
     }
},

env.ACTIONS.player_rig = {
     slug: "player_rig",
     name: "Rig Field",
     type: "target",
     desc: "'use foe resources to remove negative statuses';'chance of doubling status duration'",
     anim: "basic-attack",
     help: "'FOES:: 80%  -POSITIVE STATUS, 10%C 2*T NEGATIVE STATUS\nUSER:: 80% -NEGATIVE STATUS, 10%C 2*T POSITIVE STATUS'",
     usage: {
          act: "%USER SHUFFLES THE POWER",
          crit: "%TARGET FEELS DREAD",
          hit: "%TARGET LOOSES THEIR ENERGY",
          miss: "%USER GOT DISTRACTED"
     },
     accuracy: 0.8,
     crit: 0.1,
     amt: 0,
     exec: function(user,target) {
          let statusPool = []
          for (let i in env.STATUS_EFFECTS) {
               let statusData = env.STATUS_EFFECTS[i]
               let usable = true
               //prevent durationless statuses from appearing (and by extend, other passives)
               if(statusData.infinite && (statusData.slug != "windup")) {usable = false}
               //OKAY NEVERMIND SOME PASSES DON'T HAVE INFINITE
               if(statusData.passive) {usable = false}
               //APPARENTLY IT'S POSSIBLE TO GIVE GLOBAL MODIFIERS?????
               if(i.includes("global_")) {usable = false}
               //prevent misalign statuses from appearing, despite their duration existence
               if(i == "misalign_weaken" || i == "misalign_stun" || i == "realign" || i == "realign_stun") {usable = false}
               //and imperfect reset. i do not know how terrible that will end up.
               if(i == "imperfect_reset") {usable = false}
               //redirection probably needs an origin, so exclude it
               if(i == "redirection") {usable = false}

               if(i == "entropy_eternal") {usable = false}
          
               //console.log(i, usable)
               if(usable) statusPool.push(i)
          }
          let targetEffects = []
          target.statusEffects.forEach((status, i) => {
               //console.log(status)
               if((!status.infinite || !status.passive || !i.includes("global_")) && (statusPool.includes(status.slug))) {
                    targetEffects.push(status)
               }
          })
          let userEffects = []
          user.statusEffects.forEach((status, i) => {
               //console.log(status)
               if((!status.infinite || !status.passive || !i.includes("global_")) && (statusPool.includes(status.slug) && (status.slug != "windup"))) {
                    userEffects.push(status)
               }
          })
          targetEffects.forEach((status) => {
               if(status.beneficial) removeStatus(target, status.slug)
          })
          userEffects.forEach((status) => {
               if (!status.beneficial) removeStatus(user, status.slug)
          })
          critExec: (status) => {
               if(!status.beneficial) addStatus({target:target, status: status.slug, length: Math.floor(hasStatus(target, status.slug))})
               if(status == "windup") {
                    sendFloater({
                         target: target,
                         type: "arbitrary",
                         arbitraryString: "LMAO",
                         size: 1.5,
                    })

                    readoutAdd({
                         message: `${target.name} forgot what it was doing.`, 
                         name: "sourceless", 
                         type: "sourceless combat minordetail", 
                         show: false,
                         sfx: false
                    })
                    removeStatus(target, status)
               }
          }
          userEffects.forEach((status) => {
               if (status.beneficial) addStatus({target: user, status: status.slug, length: Math.floor(hasStatus(user, status.slug))})
          })
     }
}

env.ACTIONS.wild_frenzy = { //yknow this was what i thought would be the hardest thing to make
     slug: "wild_frenzy",
     name: "Frenzied Flail",
     type: 'target',
     desc: "'flail around';'a chance to keep hitting'",
     anim: "basic-attack",
     help: "100% -2HP, 15%C USE THIS ACTION AGAIN ON RANDOM TARGET",
     usage: {
          act: "%USER BEGINS TO FLAIL",
          crit: "%USER KEEPS FLAILING",
          hit: "%TARGET GETS WHACKED",
          miss: "%TARGET EVADES"
     },
     accuracy: 1,
     crit: 0.15,
     amt: 2,
     exec: function(user, target) { //stole a bit of frenzy's code,
          let action = this
          
          let targetTeam
                 switch(user.team.name) {
                     case "ally": targetTeam = env.rpg.enemyTeam; break;
                     case "enemy": targetTeam = env.rpg.allyTeam; break;
                 }
          
          let validTargets = targetTeam.members.filter(member => member.state != "dead" && member.state != "lastStand")
          
          if(validTargets.length) for (let i = 0; i < 1; i++) {
               if (validTargets) {
                    let target = validTargets.sample()
                    setTimeout(()=>{
                         env.GENERIC_ACTIONS.singleTarget({
                              action,
                              user,
                              target,
                              hitSfx: { name: 'shot2' },
                              critSfx: { name: 'shot6' },
			                  critExec: ({target})=> {
                                   if(target.hp > 0 && target.state != "lastStand") {
                                        env.setTimeout(()=>{
                                             useAction(user, this, target, {beingUsedAsync: true, reason: "wild_frenzy"})
                	                }, 400)
        	                   }
                              }
                         })
                    }, 500)
               }
     	  }
	     
     }
},

env.ACTIONS.player_overload = { //THis will let you traumatize the firmament :}
     slug: 'player_overload',
     name: 'Exponential Surge',
     type: 'self+autohit+support',
     desc: "'focus flailing into a long barrage';'next attack is used across entire team';'long period of focus tires shell out and stuns'",
     anim: "",
     help: "+1T:FOCUSED +EXPONENTIAL SURGE",
     usage: {
          act: "%USER HONES IN"
     },
     beneficial: true,
     
     disableIf: (actor)=>{ if(hasStatus(actor, "fear")) return "PROHIBITED BY FEAR" },
     exec: function(user, target) {
          play("talkchoir7", 1.5)
          addStatus({target: user, status: "exp_over", length: 1, noReact:true})
          addStatus({target: user, status: "focused", length: 1, noReact:true});
          return 'nothing'
     },
     avoidChaining: true
}

env.ACTIONS.entropy_burnout = {
     slug: "entropy_burnout",
     name: "Burnout",
     type:'target',
     desc: "'Set off their end'",
     anim: "basic-attack",
     help: "AUTOHIT, +5T BURNOUT ON TARGET",
     autohit: true,
     usage: {
          act: "%USER IGNITES THE ENERGY OF %TARGET",
          hit: "%TARGET STARTS TO BURN UP",
     },
     crit: 0,
     amt: 2,
     exec: function(user, target) {
          return env.GENERIC_ACTIONS.singleTarget({
               action: this, 
               user, 
               target,
               hitSfx: {
                    name: 'chomp',
                    rate: 0.7
               },

               genExec: ()=> {
                    addStatus({target, origin: user, status: "burnout", length:5});
               }
          })
     }
}

//Merchant code
for (const componentName of ["entropy"]) { // this probably isn't a function but i don't know where else to put it
     const component = env.COMBAT_COMPONENTS[componentName]
      let commerceObject = ({
         type: "humor",
         name: `${component.name.replace("Humor of ", "")}`,
         subject: component,
         value: 1,
 
         showSellIf: ()=> env.e3a2.mTotals[componentName].available > 0,
         sellExec: ()=>{
             addItem("sfer_cube")
             page.flags.components[componentName]--
             env.e3a2.mTotals = CrittaMenu.getTotals()
             env.commerceNotice = `exchanged ${component.name} for 1 ${env.ITEM_LIST['sfer_cube'].name}`
         },
     })
           env.e3a2.merchant.sellResponses.replies.push({
           name: `${commerceObject.name}::${commerceObject.value}S`,
           destination: "sell",
           hideRead: true,
           showIf: commerceObject.showSellIf,
           class: `commerce-${commerceObject.type}`,
           definition: `NOTE::'exchange for ${commerceObject.value} ${env.ITEM_LIST['sfer_cube'].name}'`,
           exec: ()=> {commerceObject.sellExec(); env.e3a2.mTotals = CrittaMenu.getTotals(); env.e3a2.updateExchangeScreen()}
      })
     env.e3a2.merchant.commerce.push(commerceObject)
 }
