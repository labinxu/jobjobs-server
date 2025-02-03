import Stripe from 'stripe';
import { RetrieveSubscription } from './customer';
import { UpdateUserSubscription } from '../../Database/user/mutations';
import { CreateSubscription, UpdateSubscription } from '../../Database/subscription/mutations';
import { Subscription } from '@prisma/client';
import { WebhookEventsE } from '@/lib/types/enums';

const WebhookEvents = {
  customer_subscription_updated: WebhookEventsE.CustomerSubscriptionUpdated,
  checkout_session_completed: WebhookEventsE.CheckoutSessionCompleted
};

export const WebhookEventHandler = async (event: Stripe.Event) => {
  // Handle the event
  switch (event.type) {
    case WebhookEvents.checkout_session_completed: {
      //@ts-expect-error, incorrect type on Stripe.Event.
      const subscriptionId = event.data.object.subscription;

      const subscription: Stripe.Subscription = await RetrieveSubscription(subscriptionId);

      const stripe_customer_id = subscription.customer as string;
      const statusSub = subscription.status as string;

      const dataSub: Subscription = {
        id: subscription.id,
        price_id: subscription.items.data[0].price.id,
        status: statusSub,
        period_ends_at: new Date(subscription.current_period_end * 1000)
      };

      await CreateSubscription(dataSub);

      console.log('Stripe Subscription Created');

      const dataUser = {
        id: event.data.object.metadata.user_id,
        stripe_customer_id,
        subscription_id: subscription.id
      };

      await UpdateUserSubscription(dataUser);

      console.log('Stripe Customer Created');
      break;
    }
    case WebhookEvents.customer_subscription_updated: {
      // Incorrect infered type, need to override.
      const subscriptionUpdate = event.data.object as unknown as Stripe.Subscription;

      const dataSub: Subscription = {
        id: subscriptionUpdate.id,
        price_id: subscriptionUpdate.items.data[0].price.id,
        status: subscriptionUpdate.status,
        period_ends_at: new Date(subscriptionUpdate.current_period_end * 1000)
      };

      await UpdateSubscription(dataSub);
      console.log('Stripe Subscription Updated');
      break;
    }
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }
};

/* 

Webhook triggers can be triggered by stripe CLI to similate webhook events. Copy and paste into terminal.

stripe.exe trigger checkout.session.completed --add checkout_session:metadata.user_id={REPLACE WITH A USER ID}

stripe.exe trigger customer.subscription.updated

stripe.exe trigger invoice.paid

ngrok setup can also be used to directly trigger events from the app. See ngrok stripe webhook guide.
*/
