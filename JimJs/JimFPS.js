echo `
		<style>
			html, body {
				width: 100%;
				height: 100%;
			}

			body {
				background-color: #ffffff;
				margin: 0;
				overflow: hidden;
				font-family: arial;
			}

			#blocker {

				position: absolute;

				width: 100%;
				height: 100%;

				background-color: rgba(0,0,0,0.5);

			}

			#instructions {

				width: 100%;
				height: 100%;

				display: -webkit-box;
				display: -moz-box;
				display: box;

				-webkit-box-orient: horizontal;
				-moz-box-orient: horizontal;
				box-orient: horizontal;

				-webkit-box-pack: center;
				-moz-box-pack: center;
				box-pack: center;

				-webkit-box-align: center;
				-moz-box-align: center;
				box-align: center;

				color: #ffffff;
				text-align: center;

				cursor: pointer;

			}

		</style>

		<div id="blocker">

			<div id="instructions">
				<span style="font-size:40px">Click to play</span>
				<br />
				(W, A, S, D = Move, SPACE = Jump, MOUSE = Look around)
			</div>

		</div>
`;