(function(window) {
	var snow = function(window) {
		// Consts
		var ConstCanvasId = 'snow';
		var ConstCanvasStyles = 'width:100%;height:100%;position:fixed; \
			top:0px;left:0px;z-index:999999;pointer-events:none; \
			-moz-pointer-events:none;-webkit-pointer-events:none; \
			-o-pointer-events:none; \
		';

		var ConstSpeed = 25;

		var ConstSnowColorR = 255;
		var ConstSnowColorG = 255;
		var ConstSnowColorB = 255;
		var ConstSnowColorA = 0.8;

		var ConstParticleMax = 50;

		// Variables
		var VarInited = false;
		var VarBody = null;
		var VarCanvas = null;
		var VarContext = null;
		var VarWindowWidth = 0;
		var VarWindowHeight = 0;
		var VarParticles = [];
		var VarAngle = 0;

		function UpdateSize() {
			VarWindowWidth = window.innerWidth;
			VarWindowHeight = window.innerHeight;
			VarCanvas.width = VarWindowWidth;
			VarCanvas.height = VarWindowHeight;
		};

		function PopulateParticles() {
			VarParticles = [];
			for(var i=0; i<ConstParticleMax; i++) {
				VarParticles.push({
					x: Math.random() * VarWindowWidth,
					y: Math.random() * VarWindowHeight,
					r: Math.random() * 4 + 1,
					d: Math.random() * ConstParticleMax,
				});
			}
		};

		function Update() {
			VarAngle += 0.01;
			for(var i=0; i<ConstParticleMax; i++) {
				var p = VarParticles[i];
				p.y += Math.cos(VarAngle + p.d) + 1 + p.r / 2;
				p.x += Math.sin(VarAngle) * 2;
				if(p.x > VarWindowWidth + 5 || p.x < -5 || p.y > VarWindowHeight) {
					if(i % 3 > 0) {
						VarParticles[i] = {
							x: Math.random() * VarWindowWidth,
							y: -10,
							r: p.r,
							d: p.d,
						};
					} else {
						if(Math.sin(VarAngle) > 0) {
							VarParticles[i] = {
								x: -5,
								y: Math.random() * VarWindowHeight,
								r: p.r,
								d: p.d,
							};
						} else {
							VarParticles[i] = {
								x: VarWindowWidth + 5,
								y: Math.random() * VarWindowHeight,
								r: p.r,
								d: p.d,
							};
						}
					}
				}
			}
		};

		function Draw() {
			VarContext.clearRect(0, 0, VarWindowWidth, VarWindowHeight);
			VarContext.fillStyle = 'rgba(' +
				ConstSnowColorR + ', ' +
				ConstSnowColorG + ', ' +
				ConstSnowColorB + ', ' +
				ConstSnowColorA + ')';
			VarContext.beginPath();
			for(var i=0; i<ConstParticleMax; i++) {
				var p = VarParticles[i];
				VarContext.moveTo(p.x, p.y);
				VarContext.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
			}
			VarContext.fill();
			Update();
		};

		function Prepare() {
			VarBody = document.getElementsByTagName('body')[0];
			if(VarBody) {
				VarCanvas = document.createElement('canvas');
				VarContext = VarCanvas.getContext('2d');
				VarCanvas.setAttribute('id', ConstCanvasId);
				VarCanvas.setAttribute('style', ConstCanvasStyles);
				VarBody.insertBefore(VarCanvas, VarBody.firstChild);

				return true;
			}
			return false;
		};

		function Start() {
			UpdateSize();
			PopulateParticles();
			setInterval(Draw, ConstSpeed);
			VarInited = true;
		};

		function Initialize() {
			if (Prepare()) {
				Start();
			}
		};

		function Resize() {
			if(VarInited) {
				UpdateSize();
				PopulateParticles();
			}
		};

		if(window.addEventListener) {
			window.addEventListener('load', Initialize, false);
			window.addEventListener('resize', Resize, false);
		} else if(window.attachEvent) {
			window.attachEvent('onload', Initialize);
			window.attachEvent('onresize', Resize);
		};

		return {};
	}(window);

	window.snow = snow;
}(window));