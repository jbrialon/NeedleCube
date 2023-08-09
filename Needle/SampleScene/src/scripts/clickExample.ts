import { Behaviour, IPointerClickHandler, PointerEventData, showBalloonMessage } from "@needle-tools/engine";

export class ClickExample extends Behaviour implements IPointerClickHandler {

    onPointerClick(_args: PointerEventData) {
        showBalloonMessage("Clicked " + this.name);

        this.gameObject.rotateY(this.context.time.deltaTime * 10)
    }
}
