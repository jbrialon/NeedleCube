import { Behaviour, GameObject, InstantiateOptions, LogType, serializeable, showBalloonMessage, WaitForSeconds } from "@needle-tools/engine";
import { Vector3 } from "three";

export class TimedSpawn extends Behaviour {
    @serializeable(GameObject)
    object?: GameObject;

    interval: number = 1000;
    max: number = 100;

    private spawned: number = 0;

    awake() {
        if (!this.object) {
            console.warn("TimedSpawn: no object to spawn");
            showBalloonMessage("TimedSpawn: no object to spawn", LogType.Warn);
            return;
        }
        GameObject.setActive(this.object, false);
        this.startCoroutine(this.spawn())
    }

    *spawn() {
        if (!this.object) return;
        while (this.spawned < this.max) {
            const position = new Vector3((Math.random() * 20) - 10,(Math.random() * 20) + 15, (Math.random() * 20) - 10)
            const instance = GameObject.instantiate(this.object, position);
            GameObject.setActive(instance!, true);
            this.spawned += 1;
            yield WaitForSeconds(this.interval / 1000);
        }
    }
}
