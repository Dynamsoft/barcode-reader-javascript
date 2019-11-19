var ringBell = (() =>{
	var successSound = undefined;
	var failureSound = undefined;
	return (isFailureRing) => {
		//isFailureRing is undefined or false ring successful bell
		if(!isFailureRing){
			if(!successSound){
				successSound = new Audio('./voice/pi.wav');
			}
			if(failureSound){
				failureSound.pause();
				failureSound.currentTime = 0;
			}
			successSound.pause();
			successSound.currentTime = 0;
			successSound.play();
			return 1;
		}
		//isFailureRing is true
		else{
			if(!failureSound){
				failureSound = new Audio('./voice/decide1.wav');
			}
			if(successSound){
				successSound.pause();
				successSound.currentTime = 0;
			}
			failureSound.pause();
			failureSound.currentTime = 0;
			failureSound.play();
			return 2;
		}
	}
})();
