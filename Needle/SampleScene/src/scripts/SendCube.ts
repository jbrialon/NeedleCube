import { Behaviour, Camera, GameObject, InstantiateOptions, Rigidbody, serializeable } from "@needle-tools/engine";
import { getWorldScale, setWorldPosition } from "@needle-tools/engine/src/engine/engine_three_utils";
import { Object3D, Vector3, Euler } from "three";


export class SendCube extends Behaviour {

    @serializeable(Object3D)
    prefab?: THREE.Object3D;

    private instances: THREE.Object3D[] = [];
    private index: number = -1;
    private pointerRotation!: Euler;

    start() {
        if (this.prefab) GameObject.setActive(this.prefab, false);
        this.pointerRotation = new Euler();
    }

    update() {
        if (this.context.input.getPointerClicked(0) && this.context.mainCameraComponent) {
            if (!this.prefab) return;

            const screenPoint = this.context.input.getPointerPositionRC(0)!;
            const comp = this.context.mainCameraComponent;

            const forward = comp.forward;
            const pos = comp.worldPosition;
            const start = pos.add(forward);

            // create a new instance from the prefab if we dont have enough yet
            // we cache previously created prefabs so we dont spawn infinite objects
            if (this.instances.length < 5) {
                const opts = new InstantiateOptions();
                opts.position = start;
                const prefabInstance = GameObject.instantiate(this.prefab, opts);
                if (!prefabInstance) return;
                this.instances.push(prefabInstance);
            }
            // get the next instance from the cache
            const i = ++this.index;
            const instance = this.instances[i % this.instances.length];
            // check the object exists
            if (!instance) return;

            // make sure the object is active
            GameObject.setActive(instance, true);

            // set the object to the spawn position and apply the force
            start.sub(new Vector3(0, 0.3, 0));
            setWorldPosition(instance, start);
            const rigidbody = GameObject.getComponent(instance, Rigidbody);
            if (!rigidbody) return;

            const vel = new Vector3(0, 0, -50);
            if (!this.context.isInXR) { 
                this.pointerRotation.y = -screenPoint.x;
                this.pointerRotation.x = screenPoint.y;
                vel.applyEuler(this.pointerRotation);
            }
            
            vel.multiplyScalar(10);
            vel.applyQuaternion(comp.worldQuaternion);
            rigidbody.resetForcesAndTorques();
            rigidbody.resetVelocities();
            rigidbody?.applyImpulse(vel);
        }
    }
}
