import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import StartGame from "./main";
import { EventBus } from "./EventBus";
import { useDojo } from "../dojo/useDojo";

export interface IRefPhaserGame {
    game: Phaser.Game | null;
    scene: Phaser.Scene | null;
}

interface IProps {
    currentActiveScene?: (scene_instance: Phaser.Scene) => void;
}

const PhaserGame = forwardRef<IRefPhaserGame, IProps>(function PhaserGame(
    { currentActiveScene },
    ref
) {
    const game = useRef<Phaser.Game | null>(null);
    const {
        setup,
        account: { account },
    } = useDojo();
    useLayoutEffect(() => {
        if (game.current === null) {
            game.current = StartGame("game-container", account, setup);

            if (ref) {
                if (typeof ref === "function") {
                    ref({ game: game.current, scene: null });
                } else {
                    (ref as React.MutableRefObject<IRefPhaserGame>).current = {
                        game: game.current,
                        scene: null,
                    };
                }
            }
        }

        return () => {
            if (game.current) {
                game.current.destroy(true);
                game.current = null;
            }
        };
    }, [ref, account, setup]);

    useEffect(() => {
        const handleSceneReady = (scene_instance: Phaser.Scene) => {
            if (currentActiveScene) {
                currentActiveScene(scene_instance);
            }

            if (ref) {
                if (typeof ref === "function") {
                    ref({ game: game.current, scene: scene_instance });
                } else {
                    (ref as React.MutableRefObject<IRefPhaserGame>).current = {
                        game: game.current,
                        scene: scene_instance,
                    };
                }
            }
        };

        EventBus.on("current-scene-ready", handleSceneReady);

        return () => {
            EventBus.off("current-scene-ready", handleSceneReady);
        };
    }, [currentActiveScene, ref]);

    return <div id="game-container"></div>;
});

export default PhaserGame;

