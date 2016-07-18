/*
** Copyright (c) 2016 The Khronos Group Inc.
**
** Permission is hereby granted, free of charge, to any person obtaining a
** copy of this software and/or associated documentation files (the
** "Materials"), to deal in the Materials without restriction, including
** without limitation the rights to use, copy, modify, merge, publish,
** distribute, sublicense, and/or sell copies of the Materials, and to
** permit persons to whom the Materials are furnished to do so, subject to
** the following conditions:
**
** The above copyright notice and this permission notice shall be included
** in all copies or substantial portions of the Materials.
**
** THE MATERIALS ARE PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
** EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
** MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
** IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
** CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
** TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
** MATERIALS OR THE USE OR OTHER DEALINGS IN THE MATERIALS.
*/

/**
 * This class defines the individual tests which are skipped because
 * of graphics driver bugs which simply can not be worked around in
 * WebGL 2.0 implementations.
 *
 * The intent is that this list be kept as small as possible; and that
 * bugs are filed with the respective GPU vendors for entries in this
 * list.
 *
 * Pass the query argument "runSkippedTests" in the URL in order to
 * force the skipped tests to be run. So, for example:
 *
 * http://localhost:8080/sdk/tests/deqp/functional/gles3/transformfeedback.html?filter=transform_feedback.basic_types.separate.points&runSkippedTests
 */
'use strict';
goog.provide('framework.common.tcuSkipList');

goog.scope(function() {

    var tcuSkipList = framework.common.tcuSkipList;

    var _skipEntries = {};
    var _wildcardSkipEntries = {};
    var _reason = "";

    function _setReason(reason) {
        _reason = reason;
    }

    function _skip(testName) {
        if(testName.indexOf("*") >= 0){
            testName = testName.split("*")[0];
            _wildcardSkipEntries[testName] = _reason;
        }else{
            _skipEntries[testName] = _reason;
        }
    }

    var runSkippedTests = false;
    var queryVars = window.location.search.substring(1).split('&');
    for (var i = 0; i < queryVars.length; i++) {
        var value = queryVars[i].split('=');
        if (decodeURIComponent(value[0]) === 'runSkippedTests') {
            // Assume that presence of this query arg implies to run
            // the skipped tests; the value is ignored.
            runSkippedTests = true;
            break;
        }
    }

    if (!runSkippedTests) {
        // Example usage:
        //
        // _setReason("Bugs in FooVendor 30.03 driver");
        // _skip("transform_feedback.basic_types.separate.points.lowp_mat2");

        // Please see https://android.googlesource.com/platform/external/deqp/+/7c5323116bb164d64bfecb68e8da1af634317b24
        _setReason("Native dEQP also fails on these tests and suppresses them");
        _skip("texture_functions.textureoffset.sampler3d_fixed_fragment");
        _skip("texture_functions.textureoffset.isampler3d_fragment");
        _skip("texture_functions.textureoffset.usampler3d_fragment");
        _skip("texture_functions.textureprojoffset.sampler3d_fixed_fragment");
        _skip("texture_functions.textureprojoffset.isampler3d_fragment");
        _skip("texture_functions.textureprojoffset.usampler3d_fragment");
        // Please see https://android.googlesource.com/platform/external/deqp/+/master/android/cts/master/src/gles3-test-issues.txt
        _skip("texture_functions.textureprojlodoffset.usampler3d_vertex");
        _skip("texture_functions.textureoffset.sampler3d_float_fragment");
        _skip("texture_functions.textureprojoffset.sampler3d_float_fragment");
        // Please see https://android.googlesource.com/platform/external/deqp/+/master/android/cts/master/src/gles3-driver-issues.txt
        _skip("texture_functions.texturegrad.samplercubeshadow*");

        _setReason("Mac OSX drivers handle R11F_G11F_B10F format incorrectly");
        // https://github.com/KhronosGroup/WebGL/issues/1832
        // deqp/functional/gles3/fragmentoutput/basic.float.html
        _skip("fragment_outputs.basic.float.r11f_g11f_b10f_mediump*");
        _skip("fragment_outputs.basic.float.r11f_g11f_b10f_highp*");
        // deqp/functional/gles3/fragmentoutput/array.float.html
        _skip("fragment_outputs.array.float.r11f_g11f_b10f_mediump*");
        _skip("fragment_outputs.array.float.r11f_g11f_b10f_highp*");
        // deqp/functional/gles3/fragmentoutput/random_00.html
        _skip("fragment_outputs.random.57");
        // deqp/functional/gles3/fragmentoutput/random_02.html
        _skip("fragment_outputs.random.11");
        // deqp/functional/gles3/fborender/resize_01.html
        _skip("render.resize.rbo_r11f_g11f_b10f");
        // deqp/functional/gles3/fborender/recreate_color_02.html
        _skip("render.recreate_color.rbo_r11f_g11f_b10f_depth_stencil_rbo_depth24_stencil8");
        // deqp/functional/gles3/fbocolorbuffer/clear.html
        _skip("color.clear.r11f_g11f_b10f");

        _setReason("Missing shadow sampler functions in D3D11");
        // https://github.com/KhronosGroup/WebGL/issues/1870
        // deqp/functional/gles3/shadertexturefunction/texturelod.html
        _skip("texture_functions.texturelod.sampler2dshadow_vertex");
        _skip("texture_functions.texturelod.sampler2dshadow_fragment");
        // deqp/functional/gles3/shadertexturefunction/texturelodoffset.html
        _skip("texture_functions.texturelodoffset.sampler2dshadow_vertex");
        _skip("texture_functions.texturelodoffset.sampler2dshadow_fragment");
        // deqp/functional/gles3/shadertexturefunction/textureprojlod.html
        _skip("texture_functions.textureprojlod.sampler2dshadow_vertex");
        _skip("texture_functions.textureprojlod.sampler2dshadow_fragment");
        // deqp/functional/gles3/shadertexturefunction/textureprojlodoffset.html
        _skip("texture_functions.textureprojlodoffset.sampler2dshadow_vertex");
        _skip("texture_functions.textureprojlodoffset.sampler2dshadow_fragment");
        // deqp/functional/gles3/shadertexturefunction/texturegrad.html
        _skip("texture_functions.texturegrad.sampler2dshadow_vertex");
        _skip("texture_functions.texturegrad.sampler2dshadow_fragment");
        _skip("texture_functions.texturegrad.sampler2darrayshadow_vertex");
        _skip("texture_functions.texturegrad.sampler2darrayshadow_fragment");
        // deqp/functional/gles3/shadertexturefunction/texturegradoffset.html
        _skip("texture_functions.texturegradoffset.sampler2dshadow_vertex");
        _skip("texture_functions.texturegradoffset.sampler2dshadow_fragment");
        _skip("texture_functions.texturegradoffset.sampler2darrayshadow_vertex");
        _skip("texture_functions.texturegradoffset.sampler2darrayshadow_fragment");
        // deqp/functional/gles3/shadertexturefunction/textureprojgrad.html
        _skip("texture_functions.textureprojgrad.sampler2dshadow_vertex");
        _skip("texture_functions.textureprojgrad.sampler2dshadow_fragment");
        // deqp/functional/gles3/shadertexturefunction/textureprojgradoffset.html
        _skip("texture_functions.textureprojgradoffset.sampler2dshadow_vertex");
        _skip("texture_functions.textureprojgradoffset.sampler2dshadow_fragment");

        _setReason("MacOSX drivers share namespaces where they should not");
        // https://github.com/KhronosGroup/WebGL/issues/1890
        // deqp/data/gles3/shaders/scoping.html
        _skip("scoping.valid.local_int_variable_hides_struct_type_vertex");
        _skip("scoping.valid.local_int_variable_hides_struct_type_fragment");
        _skip("scoping.valid.local_struct_variable_hides_struct_type_vertex");
        _skip("scoping.valid.local_struct_variable_hides_struct_type_fragment");
        _skip("scoping.valid.function_parameter_hides_struct_type_vertex");
        _skip("scoping.valid.function_parameter_hides_struct_type_fragment");

        _setReason("NVidia Linux drivers does not clamp gl_FragDepth to [0.0, 1.0]");
        // Standalone Test case:
        //  https://github.com/Kangz/GLDriverBugs/blob/master/frag_depth_clamp_32f_depth/Main.cpp
        // deqp/functional/gles3/fbodepthbuffer.html
        _skip("depth.depth_write_clamp.depth_component32f");
        _skip("depth.depth_write_clamp.depth32f_stencil8");
        _skip("depth.depth_test_clamp.depth_component32f");
        _skip("depth.depth_test_clamp.depth32f_stencil8");
    } // if (!runSkippedTests)

    /*
     * Gets the skip status of the given test. Returns an
     * object with the properties "skip", a boolean, and "reason", a
     * string.
     */
    tcuSkipList.getSkipStatus = function(testName) {
        var skipEntry = _skipEntries[testName];
        if (skipEntry === undefined) {
            return this._getWildcardSkipStatus(testName);
        } else {
            return { 'skip': true, 'reason': skipEntry };
        }
    }

    /*
     * Gets the skip status of the given tests like testpath*
     * object with the properties "skip", a boolean, and "reason", a
     * string.
    */
    tcuSkipList._getWildcardSkipStatus = function(testName) {
        var skipEntry;
        for (var key in _wildcardSkipEntries) {
            if (testName.indexOf(key) >=0 ) {
	        skipEntry = _wildcardSkipEntries[key];
	        if (skipEntry != undefined) {
                    return { 'skip': true, 'reason': skipEntry };
                }
            }
        }
        return { 'skip': false, 'reason': '' };
    }

});
