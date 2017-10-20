module Test.Main where

import Node.ChildProcess (CHILD_PROCESS, ChildProcess, defaultSpawnOptions, kill, pid, spawn)

--import Data.Foreign (Foreign)
import Data.Posix.Signal (Signal(SIGTERM))

import Control.Monad.Aff.Compat (EffFnAff, fromEffFnAff)
import Control.Monad.Aff.Console (CONSOLE, log)
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.AVar (AVAR)
import Control.Monad.Eff.Class (class MonadEff, liftEff)
import Control.Monad.Eff.Exception (try)

--import Data.Generic (class Generic, gShow)

import Test.Spec (describe, it)
import Test.Spec.Reporter.Console (consoleReporter)
import Test.Spec.Runner (PROCESS, run)

import Prelude

main :: forall eff. Eff (console :: CONSOLE, avar :: AVAR, process :: PROCESS, cp :: CHILD_PROCESS | eff) Unit
main = run [consoleReporter] do
  describe "FFI spike" do
    it "does not crash" do
      dockerDbProcess <- setUpDb
      log $ "Spawned: " <> (show $ pid dockerDbProcess)
      doTestStuffResult <- fromEffFnAff doTestStuff
      log $ "doTestStuffResult: " <> (show doTestStuffResult)
      killResult <- liftEff $ tearDownDb dockerDbProcess
      log $ "Killed: " <> (show killResult)

setUpDb :: forall eff ret. MonadEff (cp :: CHILD_PROCESS | eff) ret => ret ChildProcess
setUpDb = liftEff $ spawn "db/docker-build.sh" [] defaultSpawnOptions

tearDownDb :: forall eff ret. MonadEff (cp :: CHILD_PROCESS | eff) ret => ChildProcess -> ret Boolean
tearDownDb dbProcess = liftEff $ kill SIGTERM dbProcess

foreign import doTestStuff :: forall eff. EffFnAff (eff) String

{--
derive instance genericForeign :: Generic Foreign

instance showForeign :: Show Foreign where
  show = gShow
--}