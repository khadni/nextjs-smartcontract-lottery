import { ConnectButton } from "web3uikit";
import { account } from "moralis";
import { useEffect } from "react";

export default function Header() {
  return (
    <header className="bg-gradient-to-l from-fuchsia-500 via-green-400 to-green-100">
      <nav className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex items-center justify-between w-full py-6 border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <a href="#">
              <span className="sr-only">Workflow</span>
              <img
                className="w-auto h-24"
                src="https://stickershop.line-scdn.net/stickershop/v1/product/1313141/LINEStorePC/main.png;compress=true"
                alt=""
              />
            </a>
            <div className="hidden ml-10 space-x-8 lg:block"></div>
          </div>
          <div className="ml-10 space-x-4">
            {account ? (
              <div className="inline-block px-4 py-2 text-base font-medium text-indigo-600 bg-white border border-transparent rounded-md hover:bg-indigo-50">
                Connected with {account.slice(0, 6)}...{account.length - 4}
              </div>
            ) : (
              <ConnectButton
                moralisAuth={false}
                className="inline-block px-4 py-2 text-base font-medium text-indigo-600 bg-white border border-transparent rounded-md hover:bg-indigo-50"
              >
                Connect
              </ConnectButton>
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-center py-4 space-x-6 lg:hidden"></div>
      </nav>
    </header>
  );
}
