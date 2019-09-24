import { Deck } from "@sambego/diorama";
import slide from "../utils/SlideState";

export default class DeckOnSteroids extends Deck {
  constructor(props) {
    super(props);

    this.gotoSlide = this.gotoSlide.bind(this);
  }

  componentWillMount() {
    super.componentWillMount();
    slide.gotoSlide(this.state.slide); //init
    slide.subscribe(this.gotoSlide);
    slide.setSlideCount(this.props.children.length);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    slide.unsubscribe(this.gotoSlide);
  }

  gotoSlide(num) {
    window.history.pushState(undefined, undefined, num);
    this.setState({slide: slide.getCurrentSlide()});
  }

  getPreviousSlide() {
    let childSlide = this.props.children[slide.getCurrentSlide()];
    if (childSlide.props.previousSlide) slide.gotoSlide(childSlide.props.previousSlide);
    else slide.previousSlide();
  }

  getNextSlide() {
    let childSlide = this.props.children[slide.getCurrentSlide()];
    console.log(`next slide: ${childSlide.props.nextSlide ? childSlide.props.nextSlide : this.state.slide + 1}`);
    if (childSlide.props.nextSlide) slide.gotoSlide(childSlide.props.nextSlide);
    else slide.nextSlide();
  }
}
