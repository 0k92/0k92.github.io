/*
Copyright (C) 2023 Henry Sanger (https://suroi.io)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import $ from "jquery";
import Phaser from "phaser";

import core from "./core";
import { Game } from "./game";

import { MenuScene } from "./scenes/menuScene";
import { GameScene } from "./scenes/gameScene";

declare const API_URL: string;

$(() => {
    // Join server when play button is clicked
    $("#btn-play-solo").on("click", () => {
        void $.get(`${API_URL}/getGame`, data => {
            /* eslint-disable-next-line no-new */
            core.game?.connect(data.addr);
        });
    });

    // Initialize the game object
    core.game = new Game();

    // Create the Phaser Game
    const forceRenderer: string | null = new URLSearchParams(window.location.search).get("forceRenderer");
    core.phaser = new Phaser.Game({
        type: forceRenderer === "canvas" ? Phaser.CANVAS : forceRenderer === "webgl" ? Phaser.WEBGL : Phaser.AUTO,
        scene: [MenuScene, GameScene],
        backgroundColor: "#49993e",
        scale: {
            mode: Phaser.Scale.RESIZE,
            autoCenter: Phaser.Scale.CENTER_BOTH
        }
    });
});
