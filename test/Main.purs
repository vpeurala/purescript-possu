module Test.Main where

import Node.ChildProcess (CHILD_PROCESS, defaultSpawnOptions, kill, pid, spawn)

import Data.Posix.Signal (Signal(..))

import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)

import Prelude

main :: forall e. Eff (cp :: CHILD_PROCESS, console :: CONSOLE | e) Unit
main = do
  dockerDbProcess <- spawn "db/docker-build.sh" [] defaultSpawnOptions
  log $ "Spawned: " <> (show $ pid dockerDbProcess)
  doTestStuff
  killResult <- kill SIGTERM dockerDbProcess
  log $ "Killed: " <> (show killResult)

foreign import doTestStuff :: forall e. Eff (e) Unit
