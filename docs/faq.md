# Gearbox FAQ

This page covers the core questions most readers ask first: what Gearbox is, who it is for, how to use it, how risk works, how earning and borrowing work, how liquidations work, how governance works, and how market curation works.

---

## General

### What is Gearbox?

Gearbox is a permissionless credit layer for onchain lending and leverage. Users can supply liquidity or borrow through Credit Accounts, while curators, developers, and partners can launch markets and build on top of the infrastructure.

For open-source repositories and protocol code, see [Gearbox Protocol on GitHub](https://github.com/Gearbox-protocol).

### Who is Gearbox for?

Gearbox is designed for three main groups:

- lenders who want to earn yield by supplying liquidity
- borrowers who want leveraged exposure through Credit Accounts
- curators, developers, and partners who want to launch markets or build products on top of the infrastructure

### How do I use Gearbox?

If you are using Gearbox as a lender or borrower, the simplest entry point is the [Gearbox app](https://app.gearbox.finance). That site is a frontend, not the protocol itself. Because Gearbox Protocol is permissionless, positions can also be managed through other interfaces or directly onchain.

If you want to launch or operate markets, the curator entry point is [permissionless.gearbox.foundation](https://permissionless.gearbox.foundation).

For guides, reference material, and deeper protocol documentation, see [docs.gearbox.fi](https://docs.gearbox.fi).

---

## Security & Risks

### How is Gearbox secured?

Gearbox uses several security layers, including 20+ published audits across major protocol versions, an active [Immunefi bug bounty](https://immunefi.com/bug-bounty/gearbox/), onchain bytecode verification for permissionless deployments, monitoring and liquidation infrastructure, and internal testing before upgrades are shipped.

These measures reduce risk, but they do not remove it. Users still face smart contract, market, and operational risk. Verified permissionless deployments can also be checked against the [Gearbox bytecode repository](https://permissionless.gearbox.foundation/bytecode).

### What are the risks of using Gearbox?

Gearbox reduces risk through audits, governance controls, bug bounty incentives, bytecode verification, and market-level constraints. But users still face several core risk categories:

- **Smart contract risk.** Undiscovered bugs in Gearbox contracts, adapters, or integrated protocols could cause partial or total loss of funds.
- **Oracle risk.** Gearbox depends on external and composite price feeds. Incorrect pricing can lead to bad liquidations, bad debt, or incorrect protocol behavior.
- **Collateral and liquidation risk.** If collateral falls in value too quickly, or liquidators fail to act in time, positions can become undercollateralized and lenders can take losses.
- **Asset and issuer risk.** Stablecoins, wrapped assets, or tokenized securities may have issuer-side restrictions, depegs, freezes, or other external failure modes.
- **Network, interface, and liquidity risk.** Blockchain congestion, bridge or RPC failures, frontend outages, and high pool utilization can affect withdrawals and position management.

### Can my position be seized or frozen?

At the protocol level, no admin role can selectively seize an individual user's position. Gearbox includes emergency controls such as pause, but those controls are designed to restrict market operations in stress scenarios, not to confiscate user assets.

However, some markets — especially those involving tokenized securities or other issuer-controlled assets — may be subject to additional issuer or market-specific controls. Always read the market's own terms and conditions.

---

## Earn

### How can I earn?

You can earn by supplying supported assets through the [Gearbox app](https://app.gearbox.finance) or another integrated interface. Those assets are deposited into a pool and earn yield from borrower activity in that market.

### How much do I earn?

Supply APY is not fixed. It changes over time based on borrowing demand, pool utilization, and any market-specific incentive programs. Higher borrower demand usually leads to higher lender yield.

Live market data and pool metrics are available on [data.gearbox.finance](https://data.gearbox.finance).

### What are the risks of earning?

Alongside the general protocol risks above, earning has three main market-specific risks:

- **Bad debt risk.** If a borrower's collateral falls faster than it can be liquidated, part of the loss can be absorbed by the affected pool.
- **Liquidity risk.** You may not be able to withdraw immediately if most pool liquidity is already borrowed.
- **Market configuration risk.** Your exposure depends on the curator's risk settings, allowed collateral set, and liquidation design for that market.

### How do I withdraw?

You can withdraw supplied assets whenever enough liquidity is available in the pool. If utilization is high, you may need to wait until borrowers repay or liquidity returns.

---

## Borrow

### How do I borrow?

Gearbox is an overcollateralized lending protocol. To borrow, you deposit collateral, open a Credit Account, and borrow against that collateral through a selected market.

The simplest path is through the Borrow section of the [Gearbox app](https://app.gearbox.finance) or another integrated frontend.

### What can I borrow?

Each Gearbox market has a defined borrowed asset and its own accepted collateral set. In practice, you choose the market that matches the asset you want to borrow and the collateral you want to use.

Borrowing is possible only if that market exists and has enough available liquidity.

### How much can I borrow?

Your borrowing power depends on the value of your collateral, the market's Liquidation Thresholds, quota constraints, and your resulting Health Factor. More conservative market settings mean lower borrowing power against the same collateral base.

### How much does borrowing cost?

Borrowing cost is not fixed. It is made up of the pool's base rate, any collateral-specific quota rate, and the market's Interest Fee. As utilization rises, borrowing usually becomes more expensive.

### When do I need to repay?

Most positions do not have a fixed maturity date. As long as your Credit Account remains properly collateralized, you can keep the position open.

However, interest accrues continuously, so your Health Factor can deteriorate over time even if prices do not move.

### Does my collateral earn yield?

Not by default. Idle collateral inside a Credit Account mainly serves as protection for your debt.

If you deploy the account into a strategy, your return depends on that strategy and the assets held inside the account.

---

## Liquidations

### What are liquidations?

Liquidation is the mechanism that protects lenders when a borrower's position becomes unsafe. In Gearbox, a position becomes liquidatable when its Health Factor falls below 1, or when a market-specific expiration condition is reached.

### Who performs liquidations?

Liquidations are permissionless. Anyone can execute a liquidation on an eligible position.

Gearbox can also use deleverage bots as a first line of defense, so smaller risk breaches may be handled through partial deleveraging before a full liquidation is needed.

### What is Health Factor?

Health Factor is the main safety metric of a borrow position. It measures how much cushion your Credit Account has between the value of its assets and the debt it owes, after the protocol applies its own risk limits.

A higher Health Factor means more room for price moves and accrued interest. When Health Factor falls below 1, the position becomes eligible for liquidation.

### What is liquidation price?

Liquidation price is the price level at which your collateral would no longer support your debt and your Health Factor would fall to 1. It is not static.

It moves over time as asset prices change, interest accrues, debt grows, or you modify the position.

### How can I avoid liquidations?

The main way to avoid liquidation is to keep a healthy buffer above the minimum threshold. In practice, that means monitoring your Health Factor, adding collateral, repaying debt, reducing leverage, or closing riskier parts of the position before volatility forces the account into liquidation.

---

## Governance

### What does the DAO control?

The Gearbox DAO governs the protocol at the infrastructure layer. Its role includes authorizing new core contract versions, managing the verified bytecode repository, activating new chains, setting protocol-level fee split parameters, and approving incentive programs.

The DAO does not manage day-to-day risk settings of live curator-run markets and cannot seize user funds.

### What can GEAR token holders do?

GEAR token holders can participate in governance through Snapshot voting and related DAO processes. They influence protocol upgrades, chain activation, fee split decisions, incentive allocations, and other tokenholder programs defined by governance.

Active governance votes and governance history are available on [Snapshot](https://snapshot.box/#/s:gearbox.eth).

---

## Curation

### What is the curator's role?

A market curator operates a specific Gearbox market. The curator defines the market's boundary conditions: allowed collateral, Liquidation Thresholds, debt limits, rate models, fee levels, and allowed integrations.

The curator is a risk parameter manager, not an asset custodian. A curator can shape a market, but cannot withdraw LP funds or seize borrower collateral.

### Can anyone become a curator?

Yes. Market creation on Gearbox is permissionless within an activated chain. Any operator can launch and manage a market, provided the required infrastructure exists on that chain and the needed price feeds are available through the protocol's technical layer.
