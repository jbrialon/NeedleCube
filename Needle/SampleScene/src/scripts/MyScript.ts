import { Behaviour, Rigidbody, GameObject } from "@needle-tools/engine";
import { Vector3 } from "three";

export class MyScript extends Behaviour
{   
    start () {
        this.rigidBody = GameObject.getComponent(this.gameObject, Rigidbody);
        console.log(this.rigidBody)
    }

    update(){
        if(this.context.input.getKeyPressed() === 'w') {
            
            if (!this.rigidBody) return;

            const vel = new Vector3(0, 2, 0);

            vel.multiplyScalar(10);
            this.rigidBody?.applyImpulse(vel);
        }

        if(this.context.input.getKeyPressed() === 'd') {
            
            if (!this.rigidBody) return;

            const vel = new Vector3(-0.5, 0, 0);

            vel.multiplyScalar(10);
            this.rigidBody?.applyImpulse(vel);
        }

        if(this.context.input.getKeyPressed() === 'a') {
            
            if (!this.rigidBody) return;

            const vel = new Vector3(0.5, 0, 0);

            vel.multiplyScalar(10);
            this.rigidBody?.applyImpulse(vel);
        }

    }
}
