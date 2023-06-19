<?php


namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Query\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserRepository extends Repository
{
    public function __construct(User $Model)
    {
        $this->Model = $Model;
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            /** @var \App\Models\User $user **/
            $user = auth()->user();
            $expiration = (new \DateTime())->modify('+1 day');
            $token = $user->createToken('access_token', [$user->role], $expiration);

            return [
                'status' => 200,
                'data' => [
                    'token' => $token->plainTextToken,
                    'token_type' => 'Bearer',
                    'expires_at' => $expiration->format('Y-m-d H:i:s'),
                ]
            ];
        } else {
            return [
                'status' => 401,
                'data' => [
                    'email' => 'Credenciais inválidas.',
                ]
            ];
        }
    }
    public function logout()
    {
        Auth::user()->tokens()->delete();

        return [
            'message' => 'Logout realizado com sucesso!',
        ];
    }

    public function user()
    {
        return Auth::user();
    }
}
