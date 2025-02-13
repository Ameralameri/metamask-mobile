import TestHelpers from '../../helpers';
import { SwapsViewSelectors } from '../../selectors/swaps/SwapsView.selectors.js';
import messages from '../../../locales/languages/en.json';
import { waitFor } from 'detox';

export default class SwapView {
  static async isVisible() {
    await TestHelpers.checkIfElementByTextIsVisible(
      messages.swaps.fetching_quotes,
    );
    await TestHelpers.checkIfVisible(SwapsViewSelectors.SWAP_QUOTE_SUMMARY);
    await TestHelpers.checkIfVisible(SwapsViewSelectors.SWAP_GAS_FEE);
  }

  static async swipeToSwap() {
    const percentage = device.getPlatform() === 'ios' ? 0.72 : 0.85;
    await waitFor(element(by.id(SwapsViewSelectors.SWIPE_TO_SWAP_BUTTON)))
      .toBeVisible(100)
      .withTimeout(8000);
    await TestHelpers.delay(3000);
    await TestHelpers.swipe(
      SwapsViewSelectors.SWIPE_TO_SWAP_BUTTON,
      'right',
      'fast',
      percentage,
    );
    await TestHelpers.delay(500);
    await TestHelpers.swipe(
      SwapsViewSelectors.SWIPE_TO_SWAP_BUTTON,
      'right',
      'fast',
      percentage,
    );
  }

  static async waitForSwapToComplete(sourceTokenSymbol, destTokenSymbol) {
    await TestHelpers.checkIfElementByTextIsVisible(
      `Swap complete (${sourceTokenSymbol} to ${destTokenSymbol})`,
    );
    await device.enableSynchronization();
    await TestHelpers.delay(5000);
  }

  static async tapIUnderstandPriceWarning() {
    try {
      await TestHelpers.tapByText('I understand');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`Price warning not displayed: ${e}`);
    }
  }
}
