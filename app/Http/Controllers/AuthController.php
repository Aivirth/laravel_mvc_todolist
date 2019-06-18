<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\JWTAuth as TymonJWTAuth;

class AuthController extends Controller
{
  public function register(Request $request)
  {
    $user = User::create([
      'email'    => $request->email,
      'password' => $request->password,
    ]);

    $token = auth()->login($user);

    return $this->respondWithToken($token);
  }

  public function login()
  {
    $credentials = request(['email', 'password']);

    if (!$token = auth()->attempt($credentials)) {
      return response()->json(['error' => 'Unauthorized'], 401);
    }

    return $this->respondWithToken($token);
  }

  public function logout()
  {
    auth()->logout();

    return response()->json(['message' => 'Successfully logged out']);
  }

  public function refresh(Request $request)
  {
    // $token = $request->header('token');
    try {

      $tokenToRefresh = $request->bearerToken();
      // $newToken = auth()->refresh();

      $newToken = auth('api')->refresh($tokenToRefresh);
      $request->headers->set('Authorization', 'Bearer ' . $newToken);
      //  $token = Auth::refresh($token);
      //  $token = JWTAuth::refresh($token);


      // $newToken = JWTAuth::parseToken()->refresh();


      return response()->json(['access_token' => $newToken]);
    } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
      return response()->json(['errors' => $e->getMessage()], 401);
    } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
      return response()->json(['errors' => $e->getMessage()], 401);
    } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
      return response()->json(['errors' => $e->getMessage()], 401);
    }
  }

  /**
   * remove unnecessary fields
   * @var object
   */
  private function filterUserData($user)
  {
    unset($user->password);
    unset($user->email_verified_at);
    unset($user->created_at);
    unset($user->updated_at);

    return $user;
  }

  protected function respondWithToken($token)
  {

    $authedUser = $this->filterUserData(Auth::user());

    return response()->json([
      'access_token'          => $token,
      'token_type'            => 'bearer',
      // 'expires_in'            => auth('api')->factory()->getTTL() * 60,
      // 'expires_in' => 20,
      'expires_in' => auth('api')->factory()->getTTL(),
      'user'                  => $authedUser
    ]);
  }
}
