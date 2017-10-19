module Test.Main where

import Node.ChildProcess (CHILD_PROCESS, defaultSpawnOptions, kill, pid, spawn)

import Data.Posix.Signal (Signal(SIGTERM))

import Control.Monad.Aff (Aff)
import Control.Monad.Aff.Console (CONSOLE, log)
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.AVar (AVAR)
import Control.Monad.Eff.Class (liftEff)

import Test.Spec (describe, it)
import Test.Spec.Reporter.Console (consoleReporter)
import Test.Spec.Runner (PROCESS, run)

import Prelude

main :: forall eff. Eff (console :: CONSOLE, avar :: AVAR, process :: PROCESS, cp :: CHILD_PROCESS | eff) Unit
main = run [consoleReporter] do
  describe "FFI spike" do
    it "does not crash" do
      dockerDbProcess <- liftEff $ spawn "db/docker-build.sh" [] defaultSpawnOptions
      log $ "Spawned: " <> (show $ pid dockerDbProcess)
      liftEff doTestStuff
      killResult <- liftEff $ kill SIGTERM dockerDbProcess
      log $ "Killed: " <> (show killResult)

foreign import doTestStuff :: forall e. Eff (e) Unit
