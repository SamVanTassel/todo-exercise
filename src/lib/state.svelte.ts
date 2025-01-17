export class ShowCompleted {
  value = $state(false);
  constructor() {}
  toggle() { this.value = !this.value; }
}

export const showCompleted = new ShowCompleted();