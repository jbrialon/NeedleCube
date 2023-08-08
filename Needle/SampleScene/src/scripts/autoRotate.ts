import { Behaviour } from "@needle-tools/engine"
export class autoRotate extends Behaviour { 

    autoRotateSpeed: number = 1.0;
    start () {
        console.log('autoRotate');
    }

    update () {
        this.gameObject.rotateY(this.context.time.deltaTime * this.autoRotateSpeed)
    }
}
