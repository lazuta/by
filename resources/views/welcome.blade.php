<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>WSPA</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Ropa+Sans&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link rel="stylesheet" href="{{ URL::asset('/css/style.css') }}">
        <script src="https://yastatic.net/es5-shims/0.0.2/es5-shims.min.js"></script>
            <script src="https://yastatic.net/share2/share.js" async></script>
    </head>
    <body>
        <section id="first-screen">
            <div class="game-start">
                <div class="start-logo img-logo"></div>
                <div class="strat-fields">
                    <input type="text" placeholder="You name" id="name">
                    <select name="country" id="country"></select>
                    <input type="file" placeholder="Image" id="file" accept=".png,.webp,.jpg">
                </div>
                <div class="start-button">
                    <button id="start" onClick = "register()">Start</button>
                </div>
            </div>
        </section>
        <section id="game-screen">
            <div class="game-header">
                <div class="game-title">
                    <h1>Winter Sports Popularization Association</h1>
                </div>
                <div class="game-time">
                    <div id="mins"></div>:<div id="secs"></div>
                </div>
            </div>
            <div class="game-box" id="scene">
                <div class="health"></div>
                <div class="snowman"></div>
                <div class="ground"></div>
                <div class="dot"></div>
            </div>
            <div class="game-footer">
                <div>
                    <div class="footer-logo"></div>
                    <div class="footer-name">WSPA</div>
                </div>
                <div>
                    <div class="footer-player"></div>
                </div>
            </div>
        </section>
        <section id="over-screen">
            <div class="start-logo img-logo"></div>
            <div class="over-table">
                <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Code country</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="table-primary">
                        <th scope="row" >1</th>
                        <td>YOU</td>
                        <td>EN</td>
                      </tr>
                    </tbody>
                  </table>
            </div>
            <div class="repost">
                <div class="facebook"></div>
            </div>
            <div class="over-new">
                <button onclick = 'newGame()'>New game</button>
            </div>
        </section>
    
        <section id="loader">
            <div class="loader-01"></div>
        </section>
    
        <section id="scripts">
            
            <script src="{{ URL::asset('/js/script.js') }}"></script>
        </section>
    </body>
</html>
