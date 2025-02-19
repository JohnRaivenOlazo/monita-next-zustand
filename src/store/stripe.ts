export interface StripeState {
  userBillingLimits: any;
  plans: any[];
  userPlans: any[];
  invoices: any[];
  invoicesTotal: number;
  socket: any;
  getBillingLimits: () => Promise<void>;
}

export const createStripe = (props: any): StripeState => {
  return {
    userBillingLimits: props.userBillingLimits || null,
    plans: props.plans || [],
    userPlans: props.userPlans || [],
    invoices: props.invoices || [],
    invoicesTotal: props.invoicesTotal || 0,
    socket: props.socket || null,

    async getBillingLimits() {
      console.log('Getting billing limits');
    }
  };
};

// Export the function directly as default, similar to monitoring
export default (props: any) => createStripe(props);
