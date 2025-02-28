// Page to create trades and generate the link to share with the other party
// User able to store trade details on the site
// Will need to define an expiration date for the trade
// Purge trades from db after expiration date
export default function Page() {
  return (
    <div className="m-16">
      <h1 className="text-4xl font-bold">Make A Trade</h1>
      <p className="text-muted-foreground leading-7">
        Select the cards you want to include in your trade.
      </p>
    </div>
  );
}
