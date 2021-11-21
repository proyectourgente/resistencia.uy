#!/usr/bin/env bash
set -e
set -x
IMAGE_NAME=$1
buildah bud --tls-verify=false -t ${IMAGE_NAME} .