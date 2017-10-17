module Test.Main where

import Node.ChildProcess (ChildProcess, CHILD_PROCESS)
import Node.ChildProcess as ChildProcess

import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)

import Prelude

main :: forall e. Eff (child_process :: CHILD_PROCESS, console :: CONSOLE | e) Unit
main = do
  dockerDbProcess <- ChildProcess.spawn "db/docker-build.sh" [] ChildProcess.defaultSpawnOptions
  log "Spawned"
