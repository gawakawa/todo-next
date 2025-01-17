{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_22
    yarn-berry
    mysql84
  ];

  shellHook = ''
    export PATH=$PATH:node_modules/.bin
  '';
}
