module Test.Main where

import Node.ChildProcess (ChildProcess, CHILD_PROCESS)
import Node.ChildProcess as ChildProcess

import Data.Posix.Signal (Signal(..))

import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)

import Prelude

main :: forall e. Eff (cp :: CHILD_PROCESS, console :: CONSOLE | e) Unit
main = do
  dockerDbProcess <- ChildProcess.spawn "db/docker-build.sh" [] ChildProcess.defaultSpawnOptions
  log "Spawned"
  killResult <- ChildProcess.kill SIGTERM dockerDbProcess
  log $ "Killed: " <> (show killResult)
